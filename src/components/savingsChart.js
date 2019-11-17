import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import jsPDF from 'jspdf';

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
    var top = yScale.getPixelForValue(max);
    var zero = yScale.getPixelForValue(0);
    var bottom = yScale.getPixelForValue(min);

    // build a gradient that switches color at the 0 point
    var ctx = this.chart.chart.ctx;
    var gradient = ctx.createLinearGradient(0, top, 0, bottom);
    var ratio = Math.min((zero - top) / (bottom - top), 1);
    if (ratio < 0) ratio = 0;
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.4)');
    gradient.addColorStop(ratio, 'rgba(54, 162, 235, 0.4)');
    gradient.addColorStop(ratio, 'rgba(255, 99, 132, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0.4)');
    this.chart.data.datasets[0].backgroundColor = gradient;

    return Chart.controllers.line.prototype.update.apply(this, arguments);
  },
});

class SavingsChart extends Component {
  constructor(props) {
    super(props);

    this.savePDF = this.savePDF.bind(this);
  }
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
            label: 'Retirement Savings',
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
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Cash',
              },
              ticks: {
                beginAtZero: true,
                callback: function(value, index, values) {
                  return (
                    '$' +
                    new Intl.NumberFormat('en-US', {
                      style: 'decimal',
                      currency: 'USD',
                    }).format(value)
                  );
                },
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Age',
              },
            },
          ],
        },
      },
    });
    if (data.length) {
      const chart = document.getElementById('capture');
      chart.scrollIntoView();
    }
  }

  savePDF() {
    // get size of report page
    var reportPageHeight = document.getElementById('capture').clientHeight;
    var reportPageWidth = document.getElementById('capture').clientWidth;

    // create a new canvas object that we will populate with all other canvas objects
    var pdfCanvas = document.createElement('CANVAS');

    pdfCanvas.setAttribute('id', 'canvaspdf');
    pdfCanvas.setAttribute('height', reportPageHeight);
    pdfCanvas.setAttribute('width', reportPageWidth);

    // keep track canvas position
    var pdfctx = pdfCanvas.getContext('2d');
    // set background color to white (default is black)
    pdfctx.fillStyle = 'white';
    pdfctx.fillRect(0, 0, reportPageWidth, reportPageHeight);
    var pdfctxX = 0;
    var pdfctxY = 0;
    var buffer = 100;

    // for each chart.js chart
    [...document.getElementsByTagName('canvas')].forEach(function(el, idx) {
      // get the chart height/width
      var canvasHeight = el.clientHeight;
      var canvasWidth = el.clientWidth;

      // draw the chart into the new canvas
      pdfctx.drawImage(el, pdfctxX, pdfctxY, canvasWidth, canvasHeight);
      pdfctxX += canvasWidth + buffer;

      // our report page is in a grid pattern so replicate that in the new canvas
      if (idx % 2 === 1) {
        pdfctxX = 0;
        pdfctxY += canvasHeight + buffer;
      }
    });

    // create new pdf and add our new canvas as an image
    var pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
    pdf.addImage(pdfCanvas, 'PNG', 0, 0);

    // download the pdf
    pdf.save('retirerich_savings.pdf');
  }

  render() {
    return (
      <div>
        <div id="capture" className={classes.graphContainer}>
          <canvas id="myChart" ref={this.chartRef} />
        </div>
        <button onClick={this.savePDF}>Save as PDF</button>
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
