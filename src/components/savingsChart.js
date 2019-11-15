import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import classes from './LineGraph.module.css';

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
            label: 'Cash Savings',
            data: [86, 67, 91],
          },
        ],
      },
      options: {
        //Customize chart options
        responsive: true,
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
