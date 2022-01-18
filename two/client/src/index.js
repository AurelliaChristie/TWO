import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faUsers, faBell, faEllipsisV, faHeart, faImages, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faUserCircle, faUsers, faBell, faEllipsisV, faHeart, faImages, faTimesCircle);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);