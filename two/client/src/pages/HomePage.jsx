import React from 'react';
import { Container } from 'react-bootstrap';
import Content1 from "../components/Home/Layer1";
import Content2 from "../components/Home/Layer2";
import SideBar from '../components/SideBar/SideBar';
import Timeline from '../components/Timeline/Timeline';


const HomePage = () => {
    // Landing Page
    // return (
    //     <Container fluid>
    //         <Content1 />
    //         <Content2 />
    //     </Container>
    // )

    // If loggedIn
    return(
        <div className="homeContainer">
            <SideBar/>
            <Timeline/>
        </div>
    )
};

export default HomePage;
