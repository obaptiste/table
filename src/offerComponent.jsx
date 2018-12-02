import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import numeral from 'numeral';

import store from './store';
import './styles/offerComponent.less';

const mockSelectedPrice = {
  division: 'blob',
  from: '2018-12-11',
  green_price: 16.33,
  months: 240,
  standard_price: 16.23,
  to: '2020-11-20',
  label: '1 Jahre',
};

const mockSelectedEnergySource = {
  key: 'standard_price',
};

const mockOffer = {
  division: 'blob',
  price: [
    {
      division: 'blob',
      from: '2018-11-01',
      green_price: 611.43,
      months: 1,
      standard_pricSe: 1.33,
      to: '2019-10-30',
      label: '5 Jahr',
      standard_prices: {
        month: 18010,
        year: 15000,
        total: 150100,
      },
      green_prices: {
        month: 8510,
        year: 55010,
        total: 55010,
      },
    },
    {
      division: 'SOIom',
      from: '2018-11-01',
      green_price: 16.33,
      months: 241,
      standard_price: 16.23,
      to: '2020-11-30',
      label: '1 Jahre',
      standard_prices: {
        month: 7501,
        year: 45010,
        total: 90010,
      },
      green_prices: {
        month: 8010,
        year: 50010,
        total: 100010,
      },
    },
    {
      division: 'RTtrom',
      from: '2098-12-01',
      green_price: 16.24,
      months: 361,
      standard_price: 16.14,
      to: '2020-11-30',
      label: '13 Jahre',
      standard_prices: {
        month: 7001,
        year: 40010,
        total: 120010,
      },
      green_prices: {
        month: 7150,
        year: 45010,
        total: 135100,
      },
    },
  ],
};

const renderRow = (data, label, activeIndex) => (
  <div className='offer-data-row'>
    {data.map((el, index) => {
      const isActive = index === activeIndex;
      return (
        <div className='offer-data-tile' key={index}>
          <div key={index} className={`offer-data-block ${isActive ? 'active' : ''}`}>
            <div className={`offer-data-block-inner ${isActive ? 'active' : ''}`}>
              <div className={`offer-data-block-price ${isActive ? 'active' : ''}`}>
                {numeral(el).format('0,0.00')}
              </div>
              <div className='offer-data-block-description'>
                {label}
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

class App extends Component {
  render() {
    const { labels, isDevMode, consumption } = this.props;
    let { selectedPrice, offer, selectedEnergySource } = this.props;
    if (isDevMode) {
      selectedPrice = selectedPrice || mockSelectedPrice;
      offer = offer || mockOffer;
      selectedEnergySource = selectedEnergySource || mockSelectedEnergySource;
    }
    const renderData = {
      active: 0,
      month: [],
      year: [],
      total: [],
    };
    const prices = offer.price.map((el) => {
      if (el.standard_prices && el.green_prices) {
        return { ...el };
      }
      const standardPrice = el.standard_price;
      const greenPrice = el.green_price;
      const months = el.months;
      const standardPrices = {
        month: ((standardPrice / 100) * consumption) / 12,
        year: ((standardPrice / 100) * consumption),
        total: (standardPrice / 100) * consumption * (months / 12),
      };
      const greenPrices = {
        month: ((greenPrice / 100) * consumption) / 12,
        year: ((greenPrice / 100) * consumption),
        total: (greenPrice / 100) * consumption * (months / 12),
      };
      return {
        ...el,
        standard_prices: standardPrices,
        green_prices: greenPrices,
      };
    });
    prices.forEach((price, index) => {
      const isActive = price.months === selectedPrice.months;
      if (isActive) {
        renderData.active = index;
      }
      renderData.month.push(price[selectedEnergySource.key === 'standard_price' ? 'standard_prices' : 'green_prices'].month);
      renderData.year.push(price[selectedEnergySource.key === 'standard_price' ? 'standard_prices' : 'green_prices'].year);
      renderData.total.push(price[selectedEnergySource.key === 'standard_price' ? 'standard_prices' : 'green_prices'].total);
    });
    return (
      <div>
        <div>
          <div className='offer-data-row'>
            {prices.map((price) => {
              const isActive = price.months === selectedPrice.months;
              return (
                <div className='offer-data-tile' key={price.months}>
                  <div className='offer-data-time'>
                    {labels.getText(price.months)}
                  </div>
                  <div className={`offer-data-block ${isActive ? 'active' : ''}`}>
                    <div className={`offer-data-block-inner ${isActive ? 'active' : ''}`}>
                      <div className={`offer-data-block-price ${isActive ? 'active' : ''}`}>
                        {numeral(price[selectedEnergySource.key]).format('0,0.00')}
                      </div>
                      <div className='offer-data-block-description'>
                        {labels.getText('pricePerYear')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='offer-data-calculation-label'>
            {labels.getText('calculationLabel').replace('@consumption', consumption)}
          </div>
          {renderRow(renderData.month, labels.getText('monthLabel'), renderData.active)}
          {renderRow(renderData.year, labels.getText('yearLabel'), renderData.active)}
          {renderRow(renderData.total, labels.getText('totalLabel'), renderData.active)}
        </div>
      </div>
    );
  }
}

class Wrapper extends Component {
  render() {
    const { currentStep, labels, isDevMode } = this.props;
    if (isDevMode) {
      return <App {...this.props} />;
    }
    if (currentStep === parseInt(labels.step.text, 10)) {
      return <App {...this.props} />;
    }
    return <div />;
  }
}


const AppWithData = connect(
  state => ({
    selectedEnergySource: state.common.selectedEnergySource,
    selectedPrice: state.common.selectedPrice,
    offer: state.common.offer,
    currentStep: state.common.currentStep,
    isDevMode: state.common.isDevMode,
    consumption: state.common.consumption,
  }),
  {
  }
)(Wrapper);

class OfferComponent extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppWithData {...this.props} />
      </Provider>
    );
  }
}

export default OfferComponent;
