import React from 'react';
import Profile from '../components/Profile/Profile';

import SideBar from "../components/SideBar/SideBar";
import Timeline from "../components/Timeline/Timeline";

const ProfilePage = () => {
    // Landing Page
    return(
        <div className="homeContainer">
            <SideBar/>
            <Profile/>
        </div>
    )
};

export default ProfilePage;
