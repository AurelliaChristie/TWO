import { Users } from "../../dummyData";

import profile from "../../assets/default_profile.jfif";
import cover from "../../assets/welcome.png";

import "./Profile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`http://localhost:8000/users/AYO`);
          setCurrentUser(res.data.data);
        };
        fetchUser();
      }, []);

      return(
        <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img
              className="profileCoverImg"
              src={
                currentUser.coverPicture
                  ? public_folder + currentUser.coverPicture
                  : cover
              }
              alt=""
            />
            <img
              className="profileUserImg"
              src={
                currentUser.profilePicture
                  ? public_folder + currentUser.profilePicture
                  : profile
              }
              alt=""
            />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{currentUser.name}</h4>
            <span className="profileInfoDesc">{currentUser.division} - {currentUser.nation}</span>
            <span className="profileInfoDesc">Interest: {currentUser.interest}</span>
            <div className="buttons mx-auto mt-2">
                <Link to="/profile/edit">
                <div className="btn btn-dark btn-md" style={{backgroundColor: "#1640E4", borderColor: "#1640E4"}}>Edit Profile</div>
                </Link>
            </div>
          </div>
        </div>
      </div>
      )
    
}

export default Profile;