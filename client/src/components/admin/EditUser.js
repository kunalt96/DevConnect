import React, { useState, useRef, useEffect } from 'react';
import './EditUser.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editUsersData, updateData } from '../../actions/admin';
import Moment from 'react-moment';
import AdminLoader from '../../img/adminLoader.gif';

function EditUser({
  editUsersData,
  adminObj: { loading, retrievedUsers },
  updateData,
}) {
  const [input, setInput] = useState({ searchData: '' });
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const inputRef = useRef();
  const [isEdit, setEdit] = useState(false);
  const [editData, setData] = useState({ email: '', name: '', id: '' });
  const [userId, setUserId] = useState('');

  const { email, name } = editData;

  useEffect(() => {
    inputRef.current = _.debounce(onSearchText, 1000);
  }, []);

  const onSearchText = (value) => {
    console.log(value);
    setLoading(true);
    editUsersData(value);
  };

  useEffect(() => {
    console.log(retrievedUsers);
    setLoading(false);
    setResult(retrievedUsers);
  }, [retrievedUsers]);

  useEffect(() => {
    inputRef.current(input);
  }, [input]);

  const handleChange = (e) => {
    const inputData = e.target.value;
    setInput({ searchData: inputData });
  };

  const onEditClick = (user) => {
    setUserId(user._id);
    setEdit(true);
    console.log(input);
    setData({ email: user.email, name: user.name, id: user._id });
  };

  const updateDatahERE = () => {
    setEdit(false);
    updateData(editData);
  };

  return (
    <div>
      <br />
      <input
        type='search'
        name='search'
        placeholder='Search User by Email and Name'
        className='search-user'
        value={input.searchData}
        onChange={handleChange}
      />
      <br />
      <br />
      {isLoading && (
        // <div className='overlay-it'>
        //   <p className='overlay-text'>Loading data</p>
        // </div>
        <div className='overlay-it'>
          <img
            className='overlay-text'
            src={AdminLoader}
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      )}
      <div class='align-card-user'>
        {result &&
          result.length > 0 &&
          result.map((user) => {
            return (
              <div key={user._id} className='display-card'>
                <div className='container-card'>
                  {isEdit && userId === user._id ? (
                    <>
                      <input
                        type='text'
                        style={{
                          width: '100%',
                          padding: '5px',
                          marginTop: '5px',
                        }}
                        value={email}
                        onChange={(e) => {
                          console.log('h');
                          setData({ ...editData, email: e.target.value });
                        }}
                      ></input>
                    </>
                  ) : (
                    <h4>Name: {user.name}</h4>
                  )}
                  {isEdit && userId === user._id ? (
                    <>
                      {' '}
                      <input
                        style={{
                          width: '100%',
                          padding: '5px',
                          marginTop: '5px',
                        }}
                        type='text'
                        value={name}
                        onChange={(e) => {
                          setData({ ...editData, name: e.target.value });
                        }}
                      ></input>
                    </>
                  ) : (
                    <p>Email Id: {user.email}</p>
                  )}
                  <p>
                    Account Date:{' '}
                    <Moment format='YYYY/MM/DD'>{user.date}</Moment>
                  </p>
                  <p>Role : {user.isAdmin ? 'Admin' : 'User'}</p>
                  {isEdit && userId === user._id ? (
                    <>
                      <button
                        onClick={updateDatahERE}
                        className='btn btn-primary'
                      >
                        <i class='fas fa-check-circle'></i>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        onEditClick(user);
                      }}
                      className='btn btn-primary'
                    >
                      <i class='fas fa-edit'></i>
                    </button>
                  )}
                </div>
                <br />
              </div>
            );
          })}
      </div>
      <br />
    </div>
  );
}

EditUser.propTypes = {
  editUsersData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  adminObj: state.adminOverview,
});

export default connect(mapStateToProps, { editUsersData, updateData })(
  EditUser
);
