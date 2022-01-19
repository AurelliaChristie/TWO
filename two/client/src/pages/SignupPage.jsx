import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';

const SignupPage = () => {
    let history = useNavigate();
    
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confpass, setConfPass] = useState("");
    
    const handleUsernameChange = (event) => {
        setName(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfPassChange = (event) => {
        setConfPass(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const signup = async ()  => {
            try{
                const userSignup = await axios.post("http://localhost:8000/auth/signup", {
                    username: username,
                    name: name,
                    email: email,
                    password: password,
                    confirmPassword: confpass
                });
                event.target.reset();
                history("/login");
            } catch (error) {
                window.alert(error.response.data);
                event.target.reset();
            }
            
        }
        signup();
    };

    return (
        <Container fluid>
            <Card className="py-5 p-3 my-3 mx-auto my-5 w-50 sl-card">
                <Row className="p-2">
                    <Col>
                    <h2 className="text-center">Sign up</h2>
                    </Col>
                </Row>
    
                <Row className="pt-2 px-2">
                    <Col className="mb-3 w-75">
                        <Form id="form" onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="mb-4">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="userName" placeholder="Type your username" onChange={(e) => handleUsernameChange(e)}/>                           
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="fullName" placeholder="Type your full name" onChange={(e) => {handleNameChange(e)}}/>                           
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>E-mail Address</Form.Label>
                                <Form.Control type="email" placeholder="Type your e-mail address" onChange={(e) => {handleEmailChange(e)}}/>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Type your password" onChange={(e) => {handlePasswordChange(e)}}/>                           
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Type your password again" onChange={(e) => {handleConfPassChange(e)}}/>                           
                            </Form.Group>
                           <div className="submit-btn text-center">
                                <Button variant="primary" type="submit" className="btn btn-primary mb-1" id="submit">Submit</Button> <br/>
                                <small>
                                    <span>Already have an account? | </span>
                                    <Link to="/login" className="link">Login</Link>
                                </small>
                            </div>
                        </Form>
                    </Col>
                </Row>
        </Card>
        </Container>
    )
}

export default SignupPage;