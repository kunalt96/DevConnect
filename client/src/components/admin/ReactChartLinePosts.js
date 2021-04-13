import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class ReactChartLinePosts extends Component {
  constructor(props) {
    super(props);
    console.log('inhere');
    this.state = {
      series: [
        {
          name: 'Months',
          data: [],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Posts Made by Month',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [],
        },
      },
    };
  }
  async componentDidMount() {
    try {
      let options = [];
      let series = [];
      for (let i in this.props.data) {
        options.push(i);
        series.push(this.props.data[i]);
      }
      this.setState(
        {
          options: {
            ...this.state.options,
            xaxis: { categories: options },
          },
          series: [
            {
              name: 'Months',
              data: series,
            },
          ],
        },
        () => {
          console.log(this.state?.series);
          console.log(this.state.options);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      this.state?.series[0].data.length > 0 &&
      this.state?.options?.xaxis?.categories?.length > 0 && (
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type='line'
          width={430}
        />
      )
    );
  }
}

export default ReactChartLinePosts;
