import React from 'react';

import SideBar from "../components/SideBar/SideBar";
import Profile from '../components/Profile/Profile';

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
