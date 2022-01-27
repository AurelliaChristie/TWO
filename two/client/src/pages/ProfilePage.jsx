import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import SideBar from "../components/SideBar/SideBar";
import Profile from '../components/Profile/Profile';

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const {userId} = useParams();

    useEffect(() => {
        const getUser = async ()  => {
          const fetchUser = await axios.get(`http://localhost:8000/users/${userId}`);
          setUser(fetchUser.data.data);
        }
        getUser();
    }, [userId])

    // Landing Page
    return(
        <div className="homeContainer">
            <SideBar/>
            <Profile users={user}/>
        </div>
    )
};

export default ProfilePage;
