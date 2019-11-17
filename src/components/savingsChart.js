import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import classes from './LineGraph.module.css';

Chart.defaults.NegativeTransparentLine = Chart.helpers.clone(
  Chart.defaults.line
);
Chart.controllers.NegativeTransparentLine = Chart.controllers.line.extend({
  update: function() {
    // get the min and max values
    var min = Math.min.apply(null, this.chart.data.datasets[0].data);
    var max = Math.max.apply(null, this.chart.data.datasets[0].data);
    var yScale = this.getScaleForId(this.getDataset().yAxisID);

    // figure out the pixels for these and the value 0
    var top = yScale.getPixelForValue(max) || 10;
    var zero = yScale.getPixelForValue(0);
    var bottom = yScale.getPixelForValue(min) || 100;

    // build a gradient that switches color at the 0 point
    var ctx = this.chart.chart.ctx;
    var gradient = ctx.createLinearGradient(0, top, 0, bottom);
    var ratio = Math.min((zero - top) / (bottom - top), 1);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.4)');
    gradient.addColorStop(ratio, 'rgba(54, 162, 235, 0.4)');
    gradient.addColorStop(ratio, 'rgba(255, 99, 132, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0.4)');
    this.chart.data.datasets[0].backgroundColor = gradient;

    return Chart.controllers.line.prototype.update.apply(this, arguments);
  },
});

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
      type: 'NegativeTransparentLine',
      data: {
        //Bring in data
        labels: labels,
        datasets: [
          {
            yAxisID: 'y-axis-0',
            label: 'Cash Savings',
            data: data,
            backgroundColor: function(context) {
              var index = context.dataIndex;
              var value = context.dataset.data[index];
              return value < 0
                ? 'rgba(255, 99, 132, 0.4)'
                : 'rgba(54, 162, 235, 0.4)';
            },
            borderColor: function(context) {
              var index = context.dataIndex;
              var value = context.dataset.data[index];
              return value < 0
                ? 'rgba(255, 99, 132, 0.4)'
                : 'rgba(54, 162, 235, 0.4)';
            },
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
