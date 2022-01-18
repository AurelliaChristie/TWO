import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from '../assets/logo.png';

import "./NavBar.css";

const NavBar = () => {
    // Landing page
    // return (
        // <Navbar bg="light" variant="light" expand="lg">
        //         <Container fluid>
        //             <Navbar.Brand>
        //                 <Link to="/">
        //                     <img src={logo} alt="logo" width="70px" height="40px"/>
        //                 </Link>
        //             </Navbar.Brand>
        //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //             <Navbar.Collapse className="justify-content-end">
        //                 <Nav>
        //                     <Link to="/login" className="text-black text-decoration-none mx-2 my-auto">Log In</Link>
        //                     <div className="buttons">
        //                         <Link to="/signup" className="btn btn-dark btn-md" style={{marginRight: "20px", backgroundColor: "#1640E4", borderColor: "#1640E4"}}>Sign Up</Link>
        //                     </div>
        //                 </Nav>
        //             </Navbar.Collapse>
        //         </Container>
        // </Navbar>
    // )
    
    // If logged in
    return(
        <div className="navs" className="fixed-top">
        <Navbar bg="light" variant="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={logo} alt="logo" width="70px" height="40px"/>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-primary">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Link to="/notification" className="text-black text-decoration-none mx-2 d-inline">
                                <FontAwesomeIcon icon="bell" className="my-auto" size="lg"/>
                            </Link>
                        </Nav>
                        <Nav>
                            <Link to="/profile" className="text-black text-decoration-none mx-2 d-inline">
                                <FontAwesomeIcon icon="user-circle" className="mx-2 my-auto" size="lg"/>
                                Profile
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
        </Navbar>
        </div>
    )
};

export default NavBar;
