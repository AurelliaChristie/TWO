import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';

const EditProfilePage = () => {
    let history = useNavigate();
    
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [coverPicture, setCoverPicture] = useState("");
    const [nation, setNation] = useState("");
    const [interest, setInterest] = useState("");
    const [division, setDivision] = useState("");
    
    const handleUsernameChange = (event) => {
        setName(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.value);
    };

    const handleCoverPictureChange = (event) => {
        setCoverPicture(event.target.value);
    };

    const handleNationChange = (event) => {
        setNation(event.target.value);
    };

    const handleInterestChange = (event) => {
        setInterest(event.target.value);
    };

    const handleDivisionChange = (event) => {
        setDivision(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const signup = async ()  => {
        //     try{
        //         const userSignup = await axios.post("http://localhost:8000/auth/signup", {
        //             username: username,
        //             name: name,
        //             email: email,
        //             password: password,
        //             confirmPassword: confpass
        //         });
        //         event.target.reset();
        //         history("/login");
            // } catch (error) {
            //     window.alert(error.response.data);
            //     event.target.reset();
            // }
            
        // }
        // signup();
    };

    return (
        <Container fluid className="pb-5">
            <Card className="py-5 p-3 my-3 mx-auto my-5 w-50 sl-card">
                <Row className="p-2">
                    <Col>
                    <h2 className="text-center">Edit Profile</h2>
                    </Col>
                </Row>
    
                <Row className="pt-2 px-2">
                    <Col className="mb-3 w-75">
                        <Form id="form" onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="mb-4">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Type your username" onChange={(e) => handleUsernameChange(e)}/>                           
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Type your full name" onChange={(e) => {handleNameChange(e)}}/>                           
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>E-mail Address</Form.Label>
                                <Form.Control type="email" placeholder="Type your e-mail address" onChange={(e) => {handleEmailChange(e)}}/>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control type="file" placeholder="Choose File" onChange={(e) => {handleProfilePictureChange(e)}}/>                           
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Cover Picture</Form.Label>
                                <Form.Control type="file" placeholder="Choose File" onChange={(e) => {handleCoverPictureChange(e)}}/>                           
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Nation</Form.Label>
                                <Form.Control type="text" placeholder="Type your nation" onChange={(e) => {handleNationChange(e)}}/>                           
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Interest</Form.Label>
                                <Form.Control type="text" placeholder="Type your interest" onChange={(e) => {handleInterestChange(e)}}/>                           
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Division</Form.Label>
                                <Form.Control type="text" placeholder="Type your division" onChange={(e) => {handleDivisionChange(e)}}/>                           
                            </Form.Group>
                           <div className="submit-btn text-center">
                                <Button variant="primary" type="submit" className="btn btn-primary mb-1" id="submit">Submit</Button> <br/>
                            </div>
                        </Form>
                    </Col>
                </Row>
        </Card>
        </Container>
    )
};
export default EditProfilePage;