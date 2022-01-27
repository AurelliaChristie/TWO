import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import profile from "../../assets/default_profile.jfif";
import heart from "../../assets/heart.png";

import "./Post.css";
import langs from "../../assets/language";

const Post = ({ post, currentUser }) => {
  const public_folder_posts = process.env.REACT_APP_PUBLIC_FOLDER_POSTS;
  const public_folder_profiles = process.env.REACT_APP_PUBLIC_FOLDER_PROFILES;

  const [like, setLike] = useState(post.likes.length > 0 ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [caption, setCaption] = useState(post.caption);

  const handleLangChange = async(e, key) => {
    if(key === "ori"){
      setCaption(post.caption);
    } else {
      try{
        const translated = await axios.post("http://localhost:8000/messages/translate/text", {
          text: post.caption,
          lang: key
        })

        setCaption(translated.data)
      } catch (error){
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8000/users/${post.userId}`);
      setUser(res.data.data);
    };
    fetchUser();

    if(post.likes.filter(like => like.userId === currentUser._id).length !== 0){
      setIsLiked(true);
    }
  }, [post]);

  const likeHandler = () => {
    setLike(isLiked ? like-1 : like+1);
    setIsLiked(!isLiked);
    const likePost = async () => {
      try{
        const postLike = { "user": currentUser };
        await axios.put(`http://localhost:8000/posts/${post._id}/like`, postLike);
      } catch (error) {
        console.log(error)
      }
    }
    likePost();
  };

  const timeSince = (date) => {

    let seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return "just now";
  };

  if(post.image?.length > 0){
    return (
      <div className="p-2">
        <div className="bg-white border mt-2">
          <div>
            <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
              <div className="d-flex flex-row align-items-center px-2">
                    <img className="rounded-circle me-2" 
                      src={
                        user?.profilePicture ? 
                        public_folder_profiles + user.profilePicture : 
                        profile
                      } 
                      width="45" 
                      alt="Profile"
                    />
                    <div className="d-flex flex-column flex-wrap ml-2">
                      <span className="font-weight-bold">{user?.name}</span>
                      <span className="text-black-50">{timeSince(post.createdAt)}</span></div>
                  </div>
                  <Dropdown className="me-2">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      <FontAwesomeIcon icon="globe"/>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {Object.keys(langs).map(function(key, index) {
                          return(
                            <Dropdown.Item id={langs[key]} key={key} onClick={(e) => handleLangChange(e, key)}>{langs[key]}</Dropdown.Item>
                          )
                        })}
                        
                      </Dropdown.Menu>
                  </Dropdown>
            </div>
            <div className="p-2 px-3">
              <img className="img-fluid img-responsive" src={public_folder_posts + post.image} alt="Post"/>
            </div>
            <div className="p-2 px-3">
              <span>{caption}</span>
            </div>
            <div className="d-flex justify-content-end p-2 px-3 py-3">
              <img src={heart} className={`me-2`} style={{height: "25px", cursor: "pointer"}} onClick={likeHandler}/>
              <span>{like} likes</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-2">
        <div className="bg-white border mt-2">
          <div>
            <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
              <div className="d-flex flex-row align-items-centerpx-2">
                    <img className="rounded-circle me-2" src={user?.profilePicture ? user?.profilePicture : profile} width="45" alt="Profile"/>
                    <div className="d-flex flex-column flex-wrap ml-2">
                      <span className="font-weight-bold">{user?.name}</span>
                      <span className="text-black-50">{timeSince(post.createdAt)}</span></div>
                  </div>
                  <div className="px-2"><FontAwesomeIcon icon="ellipsis-v"/></div>
            </div>
            <div className="p-2 px-3">
              <span>{caption}</span>
            </div>
            <div className="d-flex justify-content-end p-2 py-3">
              
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Post;