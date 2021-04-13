import React, { useEffect } from 'react';
import { getOverViewData } from '../../actions/admin';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Overview.css';
import UsersTable from './UsersTable';
import AdminLoader from '../../img/adminLoader.gif';

const Overview = ({
  getOverViewData,
  adminOverview: {
    loading,
    totalUsers,
    usersWithProfiles,
    totalPosts,
    experienceDevelopers,
    totalImagesUploaded,
  },
}) => {
  useEffect(() => {
    getOverViewData();
  }, []);

  if (loading)
    return (
      <>
        <div className='styleSpinner'>
          <img src={AdminLoader} style={{ width: '100px', height: '100px' }} />
        </div>
      </>
    );

  return (
    <>
      {!loading && (
        <>
          <h1 style={{ color: '#17a2b8' }}>Overview</h1>
          <br />
          <div className='row'>
            <div className='column'>
              <div className='card'>
                <h6>Total Users</h6>
                <p>
                  <span>
                    <i style={{ fontSize: '36px' }} className='fas fa-user'></i>
                  </span>
                  {totalUsers}
                </p>
              </div>
            </div>

            <div className='column'>
              <div className='card'>
                <h6>Total Profiles</h6>
                <p>
                  <span>
                    <i
                      style={{ fontSize: '36px' }}
                      className='far fa-id-card'
                    ></i>
                  </span>
                  {usersWithProfiles}
                </p>
              </div>
            </div>

            <div className='column'>
              <div className='card'>
                <h6>Total Posts</h6>
                <p>
                  <span>
                    <i
                      style={{ fontSize: '36px' }}
                      className='fas fa-newspaper'
                    ></i>
                  </span>
                  {totalPosts}
                </p>
              </div>
            </div>

            <div className='column'>
              <div className='card'>
                <h6>Experienced Developers</h6>
                <p>
                  <span>
                    <i
                      className='fas fa-award'
                      style={{ fontSize: '36px' }}
                    ></i>
                  </span>
                  {experienceDevelopers}
                </p>
              </div>
            </div>
            <div className='column'>
              <div className='card'>
                <h6>Total Images Uploaded</h6>
                <p>
                  <span>
                    <i
                      className='fas fa-camera'
                      style={{ fontSize: '36px' }}
                    ></i>
                  </span>
                  {totalImagesUploaded}
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className='table-users'>
            <h3>Users Table</h3>
            <UsersTable />
          </div>
        </>
      )}
    </>
  );
};

Overview.propTypes = {
  getOverViewData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  adminOverview: state.adminOverview,
});

export default connect(mapStateToProps, { getOverViewData })(Overview);
