import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { callAllUsers } from '../../actions/admin';
import PropTypes from 'prop-types';
import Profiles from '../profiles/Profiles';
import Moment from 'react-moment';

function UsersTable({ adminObj: { loading, users }, callAllUsers }) {
  const [searchItem, setSearchItem] = useState('');
  const [userDetails, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    callAllUsers();
  }, [callAllUsers]);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  useEffect(() => {
    filterData();
  }, [searchItem]);

  const filterData = () => {
    if (searchItem.length > 1) {
      const searchFilter = searchItem.toLowerCase();
      const filtering = userDetails.filter((user) => {
        return Object.keys(user).some((key) => {
          return user[key].toString().toLowerCase().includes(searchFilter);
        });
      });
      setFilteredData(filtering);
    } else {
      setFilteredData([]);
    }
  };

  const tableCreation = (value) => {
    return value.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{user.date}</Moment>
        </td>
        <td>{user.isAdmin ? 'Admin' : 'User'}</td>
      </tr>
    ));
  };

  const usersTable =
    filteredData.length > 0
      ? tableCreation(filteredData)
      : tableCreation(userDetails);

  if (loading) return <p className='my-3'>Date Loading...</p>;

  return (
    <>
      <br />
      <div className='form'>
        <input
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
          placeholder='Search with Name or Email or Date'
          type='search'
        />
      </div>
      <table style={{ width: '100%', marginTop: '20px' }} className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Id</th>
            <th>Account Opening Date</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {(filteredData.length > 0 || userDetails.length > 0) && usersTable}
        </tbody>
      </table>
    </>
  );
}

Profiles.propTypes = {
  callAllUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adminObj: state.admin,
});

export default connect(mapStateToProps, { callAllUsers })(UsersTable);
