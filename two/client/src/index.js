import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthContext } from './contexts/AuthContext';
import { AuthReducer } from "./reducers/AuthReducer";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faUsers, faBell, faEllipsisV, faHeart, faImages, faTimesCircle, faRss, faBars, faComment, faAngleDown, faAngleUp, faLaugh, faHashtag, faPlus, faGlobe, faEdit, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faUserCircle, faUsers, faBell, faEllipsisV, faHeart, faImages, faTimesCircle, faRss, faBars, faComment, faAngleDown, faAngleUp, faLaugh, faHashtag, faPlus, faGlobe, faEdit, faPencilAlt );

const ContextProvider = () => {
  const [user, dispatchUser] = useReducer(AuthReducer, {loggedIn: null, socket: null});

  return(
    <AuthContext.Provider value = {{user, dispatchUser}}>
        <App />
    </AuthContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider/>
  </React.StrictMode>,
  document.getElementById('root')
);