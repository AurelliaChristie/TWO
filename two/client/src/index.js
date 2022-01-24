import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthContext } from './contexts/AuthContext';
import { AuthReducer } from "./reducers/AuthReducer";
import { SocketContext } from "./contexts/SocketContext";
import { SocketReducer } from "./reducers/SocketReducer";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faUsers, faBell, faEllipsisV, faHeart, faImages, faTimesCircle, faRss, faBars, faComment, faAngleDown, faAngleUp, faLaugh } from '@fortawesome/free-solid-svg-icons';

library.add(faUserCircle, faUsers, faBell, faEllipsisV, faHeart, faImages, faTimesCircle, faRss, faBars, faComment, faAngleDown, faAngleUp, faLaugh );

const ContextProvider = () => {
  const [user, dispatchUser] = useReducer(AuthReducer, {loggedIn: null});
  const [socket, dispatchSocket] = useReducer(SocketReducer, {socket: {socket:null, onlineUsers: []}});

  return(
    <AuthContext.Provider value = {{user, dispatchUser}}>
      <SocketContext.Provider value = {{socket, dispatchSocket}}>
        <App />
      </SocketContext.Provider>
    </AuthContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider/>
  </React.StrictMode>,
  document.getElementById('root')
);