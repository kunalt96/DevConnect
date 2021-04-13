import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const Sidebar = () => {
  return (
    <div id='mySidenav' className='sidenav'>
      <Link className='first-tag' to='/adminComponent/Overview'>
        <p data-tip='Overview'>
          <i className='fas fa-tachometer-alt'></i>
        </p>
        <ReactTooltip effect='solid' />
      </Link>
      <Link to='/adminComponent/Analytics'>
        <p data-tip='Analytics'>
          <i className='fas fa-chart-pie'></i>
        </p>
        {/* <ReactTooltip type='light' /> */}
      </Link>
      <Link to='/adminComponent/UsersData'>
        <p data-tip='Add User'>
          <i className='fas fa-users'></i>
        </p>
        {/* <ReactTooltip type='light' /> */}
      </Link>
      <Link to='/adminComponent/UserProfiles'>
        <p data-tip='Users Profiles'>
          <i className='fas fa-align-right'></i>
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
