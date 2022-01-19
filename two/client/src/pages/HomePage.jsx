import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Content1 from "../components/Home/Layer1";
import Content2 from "../components/Home/Layer2";
import SideBar from '../components/SideBar/SideBar';
import Timeline from '../components/Timeline/Timeline';
import { AuthContext } from "../contexts/AuthContext";

const HomePage = () => {
    const { user } = useContext(AuthContext);

    const [login, setLogin] = useState(false);

    useEffect(() => {
        if(user.loggedIn !== null){
           setLogin(true)
        }
    },[user]);

    if(login == false){
        // Landing Page
        return (
            <Container fluid>
                <Content1 />
                <Content2 />
            </Container>
        )
    } else {
        // If loggedIn
        return(
            <div className="homeContainer">
                <SideBar/>
                <Timeline/>
            </div>
        )
    }    
};

export default HomePage;
