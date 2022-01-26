import React from 'react';
import "./Chat.css";
import profile from "../../assets/default_profile.jfif";

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

const Chat = ({chat, mine, friend}) => {
  const public_folder_profile = process.env.REACT_PUBLIC_FOLDER_PROFILES;

  return (
  <div className={mine ? "chat mine": "chat"}>
      <div className="chatTop">
          <img src={friend ? public_folder_profile + friend : profile} alt="" className="chatImg"/>
          <p className="chatText">{chat.text}</p>
      </div>
      <div className='chatBottom'>{timeSince(chat.createdAt)}</div>
  </div>
  )
};

export default Chat;
