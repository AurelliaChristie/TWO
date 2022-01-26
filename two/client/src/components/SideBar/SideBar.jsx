import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

import { AuthContext } from "../../contexts/AuthContext";
import User from "../User/User";
import Channel from "../Channel/Channel";
import AddChannel from "../Channel/AddChannel";
import profile from "../../assets/default_profile.jfif";

import "./SideBar.css";

const SideBar = () => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [allProfiles, setAllProfiles] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allChannels, setAllChannels] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    // user.socket?.on("getOnlineUsers", (data) => {
    //   setOnlineUsers(data)
    // });
    // console.log(onlineUsers)
    const getAllChannels = async () => {
      try{
        const channels = await axios.get(`http://localhost:8000/conversations/channels`);
        setAllChannels(channels.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllChannels();
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
          <ul className="sidebarUserList">
            {allChannels?.map((channel) => {
                return(
                  <Link to={`/chat/${channel._id}?channel=true`} className="text-decoration-none text-white"  key={channel._id}>
                    <Channel channel={channel}/>
                  </Link>
                )
                } 
              )
            }
            <AddChannel/>
          </ul>
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