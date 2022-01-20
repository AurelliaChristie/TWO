import React, { useEffect, useContext, useState } from 'react';
import MainRouter from './routers/MainRouter';
import { AuthContext } from './contexts/AuthContext';
import axios from 'axios';
import Loading from "./components/Loading";

import './App.css';

const App = () => {
  
  const { dispatchUser } = useContext(AuthContext);
  const [validate, setValidate] = useState(false);
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
      } catch(error) {
        console.log(`Get Profile Error: ${error}`)
      }
    }
    getProfile();
  }
    setValidate(true);
  }, [token])

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
