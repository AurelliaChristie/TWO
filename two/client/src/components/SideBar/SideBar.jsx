import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

import { AuthContext } from "../../contexts/AuthContext";
import User from "../User/User";
import profile from "../../assets/default_profile.jfif";

import "./SideBar.css";

const SideBar = () => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [allProfiles, setAllProfiles] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    user.socket?.on("getOnlinesUsers", data => {
      setOnlineUsers([...onlineUsers, data])
    });
  }, [])
  

  useEffect(() => {
    const getAllProfile = async () => {
      try{
        const profiles = await axios.get(`http://localhost:8000/users/${user.loggedIn?._id}/all`);
        setAllProfiles(profiles.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllProfile();
  }, [user]);

  return(
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" className="text-decoration-none text-white">
              <FontAwesomeIcon icon="rss" />
              <span className="sidebarListItemText ms-3">Timeline</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon="users" />
            <span className="sidebarListItemText ms-3">Channels</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon="comment" />
            <span className="sidebarListItemText ms-3">Direct Messages</span>
          </li>
          <ul className="sidebarUserList">
            {allProfiles?.map((profile) => {
                let online = onlineUsers?.filter((user) => user.userId === profile._id);
                  return(
                    <Link to={`/chat/${profile._id}`} className="text-decoration-none text-white"  key={profile._id}>
                      <User user={profile} online={online?.length > 0 ? true: false}/>
                    </Link>
                  )
                } 
              )
            }
          </ul>
        </ul>
      </div>
    </div>
  )
};

export default SideBar;