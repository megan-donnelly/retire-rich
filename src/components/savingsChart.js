import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import classes from './LineGraph.module.css';

class SavingsChart extends Component {
  chartRef = React.createRef();
  myLineChart = undefined;
  componentDidMount() {
    this.buildChart();
  }
  componentDidUpdate() {
    this.buildChart();
  }
  buildChart() {
    const myChartRef = this.chartRef.current.getContext('2d');

    const { data, labels } = this.props;

    if (this.myLineChart !== undefined) {
      this.myLineChart.destroy();
    }

    this.myLineChart = new Chart(myChartRef, {
      type: 'line',
      data: {
        //Bring in data
        labels: labels,
        datasets: [
          {
            label: 'Cash Savings',
            data: data,
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
    data: state.chart.data,
    labels: state.chart.labels,
  };
};

export default connect(mapState)(SavingsChart);
