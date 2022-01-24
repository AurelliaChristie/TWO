import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import {io} from "socket.io-client";

import Loading from "./components/Loading";
import MainRouter from './routers/MainRouter';

import { AuthContext } from './contexts/AuthContext';
import { SocketContext } from "./contexts/SocketContext";

import './App.css';

const App = () => {
  const { dispatchUser } = useContext(AuthContext);
  const { dispatchSocket } = useContext(SocketContext);
  const [validate, setValidate] = useState(false);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setValidate(false);
    if(token){
      const getProfile = async() => {
        try{
          const fetchProfile = await axios.get("http://localhost:8000/users", {
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          dispatchUser({
            type: "LOGIN",
            user: fetchProfile.data.data
          })

          // Create connection to socket - ws: web socket
          setSocket(io("ws://localhost:5000"));
          // Send current user ID
          socket?.emit("sendUserId", fetchProfile?.data.data._id);
          // Get online users
          socket?.on("getOnlineUsers", users => {
            setOnlineUsers(users);
          })
      } catch(error) {
        console.log(`Get Profile Error: ${error}`)
      }
    }
    getProfile();
  }
    setValidate(true);
  }, [token])

  useEffect(() => {
    if(socket !== null && onlineUsers.length > 0){
      // dispatch socket
      dispatchSocket({
        type: "CONNECT",
        socket: socket,
        onlineUsers: onlineUsers
      })
    }
  }, [socket, onlineUsers])
  

  if(validate){
    return (
      <MainRouter/>
    )
  } else {
    return (
      <Loading/>
    )
  }
  
};

export default App;
