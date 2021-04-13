import React, { Component } from 'react';
import UserBarGraph from './ReactChartsAnalytics';
import UsersPieChart from './ReactSkillsPieChart';
import ReactChartLinePosts from './ReactChartLinePosts';
import { connect } from 'react-redux';
import { getAnalyticsData } from '../../actions/admin';
import './Analytics.css';

class Analytics extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    try {
      this.props.getAnalyticsData();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      adminOverviewBarGraph: {
        barGraphDataUsers,
        loading,
        pieChartTotalSkills,
        developersStatusPie,
        postsMadeMonthLine,
      },
    } = this.props;
    if (loading) return <h1>Loading data</h1>;
    return (
      <>
        <h1 style={{ color: '#17a2b8' }}>Analytics</h1>
        <br />{' '}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div className='card-graph'>
            <div className='container-graph'>
              {barGraphDataUsers &&
                barGraphDataUsers.options &&
                barGraphDataUsers.series && (
                  <UserBarGraph
                    options={barGraphDataUsers?.options?.xaxis.categories}
                    series={barGraphDataUsers?.series.data}
                  />
                )}
            </div>
          </div>
          <div className='card-graph'>
            <div className='container-graph'>
              {pieChartTotalSkills &&
                pieChartTotalSkills.options &&
                pieChartTotalSkills.series && (
                  <UsersPieChart
                    options={pieChartTotalSkills.options}
                    series={pieChartTotalSkills.series}
                    title={'Developers by Skills'}
                  />
                )}
            </div>
          </div>
          <div className='card-graph'>
            <div className='container-graph'>
              {developersStatusPie &&
                developersStatusPie.options &&
                developersStatusPie.series && (
                  <UsersPieChart
                    options={developersStatusPie.options}
                    series={developersStatusPie.series}
                    title={'Developer Status'}
                  />
                )}
            </div>
          </div>
          <div className='card-graph'>
            <div className='container-graph'>
              {postsMadeMonthLine && (
                <ReactChartLinePosts data={postsMadeMonthLine} />
              )}
            </div>
          </div>
        </div>
        <br />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  adminOverviewBarGraph: state.adminOverview,
});

export default connect(mapStateToProps, { getAnalyticsData })(Analytics);
