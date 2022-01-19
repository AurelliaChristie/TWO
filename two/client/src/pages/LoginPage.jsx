import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LoginPage = () => {
    const history = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const login = async ()  => {
            try{
                const userLogin = await axios.post("http://localhost:8000/auth/login", {
                    username: username,
                    password: password
                });
                localStorage.setItem("token", userLogin.data.token);
                event.target.reset();
                history("/");
            } catch (error) {
                window.alert(error.response.data);
                event.target.reset();
            }
            
        }
        login();
    };

    return (
        <Container fluid>
            <Card className="py-5 p-3 my-5 mx-auto my-5 w-50 sl-card">
                <Row className="p-2">
                    <Col>
                    <h2 className="text-center">Log In</h2>
                    </Col>
                </Row>
    
                <Row className="pt-2 px-2">
                    <Col className="mb-3 w-75">
                        <Form id="form" onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="mb-4">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Type your username"  onChange={(e) => handleUsernameChange(e)}/>
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Type your password"  onChange={(e) => handlePasswordChange(e)}/>
                                {/* <small>                                   
                                    <Link to="/" className="text-reset">Forgot password?</Link>
                                </small> */}

                            </Form.Group>
                            <div className="submit-btn text-center">
                                <Button variant="primary" type="submit" className="btn btn-primary mb-1" id="submit">Submit</Button> <br/>
                                <small>
                                    <span>Don't have an account? | </span>
                                    <Link to="/signup" className="link">Sign Up</Link>
                                </small>
                            </div>
                        </Form>
                    </Col>
                </Row>
        </Card>
    </Container>
    )
}

export default LoginPage;