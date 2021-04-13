import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class UsersBarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        xaxis: {
          categories: props.options,
        },
        title: {
          text: 'Users Added By month',
          align: 'left',
        },
        theme: {
          mode: 'light',
          palette: 'palette3',
          monochrome: {
            enabled: false,
            color: 'green',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
      },
      series: [
        {
          data: props.series,
        },
      ],
    };
  }
  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type='bar'
        width={430}
      />
    );
  }
}
export default UsersBarGraph;
