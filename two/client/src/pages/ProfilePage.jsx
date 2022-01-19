import React, {useContext} from 'react';

import SideBar from "../components/SideBar/SideBar";
import Profile from '../components/Profile/Profile';

import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
    const {user} = useContext(AuthContext);

    // Landing Page
    return(
        <div className="homeContainer">
            <SideBar/>
            <Profile user={user}/>
        </div>
    )
};

export default ProfilePage;
