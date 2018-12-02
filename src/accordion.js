import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SpanningTable from './table';


//below is the mock data the idea being the prices for room types are more or less fixed with a variance added
const mockSelectedPrice = {
    division: 'Strom',
    from: '2018-12-01',
    green_price: 6.33,
    months: 24,
    standard_price: 6.23,
    to: '2020-11-30',
    label: '2 Jahre',
  };
  
  const mockSelectedHotel = {
    key: 'theHotel',
    name: 'The Royal Payne',
    desc:'',
    variance: 0.8,
    from: '11th Nov',
    to: '20th Nov',
  };
  
  const mockOffer = {
    key: 'theBetterOffer',
    price: [
      {
        division: 'Strom',
        from: '2018-12-01',
        green_price: 6.43,
        months: 12,
        standard_price: 6.33,
        to: '2019-11-30',
        label: '1 Jahr',
        standard_prices: {
          month: 800,
          year: 5000,
          total: 5000,
        },
        green_prices: {
          month: 850,
          year: 5500,
          total: 5500,
        },
      },
      {
        division: 'Strom',
        from: '2018-12-01',
        green_price: 6.33,
        months: 24,
        standard_price: 6.23,
        to: '2020-11-30',
        label: '2 Jahre',
        standard_prices: {
          month: 750,
          year: 4500,
          total: 9000,
        },
        green_prices: {
          month: 800,
          year: 5000,
          total: 10000,
        },
      },
      {
        division: 'Strom',
        from: '2018-12-01',
        green_price: 6.24,
        months: 36,
        standard_price: 6.14,
        to: '2021-11-30',
        label: '3 Jahre',
        standard_prices: {
          month: 700,
          year: 4000,
          total: 12000,
        },
        green_prices: {
          month: 750,
          year: 4500,
          total: 13500,
        },
      },
    ],
  };

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Expansion Panel 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <SpanningTable/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Expansion Panel 2</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <SpanningTable/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel disabled>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
