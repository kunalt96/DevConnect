import React, { Fragment, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import createConnection from '../../utils/socketioConnection'
import { showNotifications } from '../../actions/notifications'
import { removeNotifications, setNotifications } from '../../actions/alert'

let socket
const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  removeNotifications,
  setNotifications,
  showNotifications,
}) => {
  const location = useLocation()
  console.log(location.pathname)

  useEffect(() => {
    if (isAuthenticated && user) {
      socket = createConnection(user._id)
      console.log(socket)
      socket.on('notification', function (data) {
        showNotifications(data)
        setNotifications(
          'Post uploaded - Check notifications section for more details'
        )
        setTimeout(() => {
          console.log('Clling it')
          removeNotifications()
        }, 4000)
      })
      return () => {
        console.log('unmouting myself')
        socket.emit('disconnectit', { id: user?._id })
        socket.off()
      }
    }
  }, [isAuthenticated, user])

  if (location.pathname.indexOf('/adminComponent') !== -1) {
    return (
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i> DevKonnector
          </Link>
        </h1>
        {!loading && (
          <Fragment>
            {' '}
            <ul>
              <li>
                <a onClick={logout} href='#!'>
                  <i className='fas fa-sign-out-alt'>
                    {' '}
                    <span className='hide-sm'>Logout</span>
                  </i>
                </a>
              </li>
            </ul>
          </Fragment>
        )}
      </nav>
    )
  }

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/notifications'>
          <i class='fas fa-envelope'>
            {' '}
            <span className='hide-sm'>Notifications</span>
          </i>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'>
            {' '}
            <span className='hide-sm'>Dashboard</span>
          </i>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'>
            {' '}
            <span className='hide-sm'>Logout</span>
          </i>
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  )

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevKonnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    showNotifications: (data) => dispatch(showNotifications(data)),
    setNotifications: (msg) => dispatch(setNotifications(msg)),
    removeNotifications: () => dispatch(removeNotifications()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
