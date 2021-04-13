import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class UsersPieChart extends Component {
  constructor(props) {
    super(props);
    console.log('inhere', props.title);
    this.state = {
      options1: {
        chart: {
          width: 600,
          type: 'pie',
        },
        labels: props.options,
        title: {
          text: props.title,
          align: 'left',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
      series1: props.series,
    };
  }
  render() {
    return (
      <ReactApexChart
        options={this.state.options1}
        series={this.state.series1}
        type='donut'
        width={430}
      />
    );
  }
}
export default UsersPieChart;
