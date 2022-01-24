import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import Content1 from "../components/Home/Layer1";
import Content2 from "../components/Home/Layer2";
import SideBar from '../components/SideBar/SideBar';
import Timeline from '../components/Timeline/Timeline';

import { AuthContext } from "../contexts/AuthContext";
import { SocketContext } from "../contexts/SocketContext";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const currentUser = user.loggedIn;
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [login, setLogin] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(user.loggedIn !== null){
           setLogin(true)

           const getPosts = async ()  => {
            const fetchPosts = await axios.get(`http://localhost:8000/posts/timeline/${currentUser._id}`);
            setPosts(fetchPosts.data.data);
            }
           getPosts();
        }
    },[user]);

    useEffect(() => {
        if(socket !== null){
            setOnlineUsers(socket?.onlineUsers)
            console.log(onlineUsers)
        }
    }, [socket])
    
    if(login === false && onlineUsers?.length === 0){
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
                <SideBar onlineUsers={onlineUsers}/>
                <Timeline posts={posts}/>
            </div>
        )
    }    
};

export default HomePage;
