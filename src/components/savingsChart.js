import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import classes from './savingsChart.css';

class SavingsChart extends Component {
  constructor(props) {
    super(props);
  }
  chartRef = React.createRef();
  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'line',
      data: {
        //Bring in data
        labels: ['Jan', 'Feb', 'March'],
        datasets: [
          {
            label: 'Sales',
            data: [86, 67, 91],
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
  }
  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    data: state.data,
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(SavingsChart);
