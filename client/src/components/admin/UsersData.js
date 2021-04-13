import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UsersForms from './UserForms';
import EditUser from './EditUser';

const UsersData = () => {
  return (
    <>
      <h1 style={{ color: '#17a2b8' }}>Add/Remove User Data</h1>
      <br />
      <Tabs>
        <TabList>
          <Tab>
            {' '}
            <i className='fas fa-user-plus'></i> &nbsp; Add User
          </Tab>
          <Tab>
            <i className='fas fa-edit'></i> &nbsp; Edit User
          </Tab>
        </TabList>

        <TabPanel>
          <UsersForms />
        </TabPanel>
        <TabPanel>
          <EditUser />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default UsersData;
