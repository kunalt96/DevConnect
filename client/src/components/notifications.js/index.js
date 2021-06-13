import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
import createConnection from '../../utils/socketioConnection';
import { connect } from 'react-redux';
import { showNotifications } from '../../actions/notifications';
import Moment from 'react-moment';

// let socket;

function Notifications({ showNotifications, notificationMessages }) {
  const [message, setMessage] = useState([]);

  //   useEffect(() => {
  //     socket = createConnection();
  //   }, []);

  //   useEffect(() => {
  //     socket.on('notification', function (data) {
  //       console.warn(data);
  //       showNotifications(data);
  //     });
  //   }, [message]);

  //   const sendMessage = () => {
  //     console.log('called');
  //     socket.emit('sendMessage', 'Lets we rock on the floor', () => {
  //       console.log('done here--');
  //     });
  //   };

  //   console.warn(notificationMessages?.messages);

  return (
    <>
      <div>Notification Here</div>
      {notificationMessages?.messages &&
        notificationMessages.messages.length > 0 &&
        notificationMessages.messages.map((value, key) => {
          return (
            <p key={key}>
              {value.newNotificationObject.message} at
              <Moment format='YYYY/MM/DD'>{new Date()}</Moment>
            </p>
          );
        })}
    </>
  );
}

const mapStateToProps = (state) => ({
  notificationMessages: state.notifications,
});

export default connect(mapStateToProps, { showNotifications })(Notifications);
