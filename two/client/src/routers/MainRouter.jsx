import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ProfilePage from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfile';
import Conversation from '../pages/Conversation/Conversation';

const MainRouter = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path='/chat' element={<Conversation/>} exact/>
                <Route path='/profile/edit' element={<EditProfilePage/>} exact/>
                <Route path='/profile/:userId' element={<ProfilePage/>} exact/>
                <Route path='/login' element={<LoginPage/>} exact/>
                <Route path='/signup' element={<SignupPage/>} exact/>
                <Route path='/' element={<HomePage/>} exact/>
            </Routes>
            <Footer/>
        </Router>
    )
};

export default MainRouter;
