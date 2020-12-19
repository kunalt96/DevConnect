import './App.css';
import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <React.Fragment>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </React.Fragment>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
