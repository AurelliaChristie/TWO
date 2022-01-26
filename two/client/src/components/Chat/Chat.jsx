import React, {useState} from 'react';
import "./Chat.css";
import profile from "../../assets/default_profile.jfif";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import langs from "../../assets/language";

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

const Chat = ({chat, mine, friend, name}) => {
  const public_folder_profile = process.env.REACT_PUBLIC_FOLDER_PROFILES;
  const [message, setMessage] = useState(chat.text);

  const handleLangChange = async(e, key) => {
    if(key === "ori"){
      setMessage(chat.text);
    } else {
      try{
        const translated = await axios.post("http://localhost:8000/messages/translate/text", {
          text: chat.text,
          lang: key
        })

        setMessage(translated.data)
      } catch (error){
        console.log(error);
      }
    }
  }
  // Private message
  if(!name){
    return (
    <div className={mine ? "chat mine": "chat"}>
      {mine ? (
          <div className="chatTop">
            <img src={friend ? public_folder_profile + friend : profile} alt="" className="chatImg"/>
            <p className="chatText">{message}</p>
          </div>
      ) : (
        <div className="chatTop">
          <img src={friend ? public_folder_profile + friend : profile} alt="" className="chatImg"/>
          <p className="chatText">{message}</p>
          <Dropdown className="ms-3 mt-1">
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
      )}
        <div className='chatBottom'>{timeSince(chat.createdAt)}</div>
    </div>
    )
    // Channel Message
  } else {
    return (
      <div className={mine ? "chat mine": "chat"}>
        {mine ? (
          <div className="chatTop">
            <img src={friend ? public_folder_profile + friend : profile} alt="" className="chatImg"/>
            <p className="chatText">{message}</p>
          </div>
      ) : (
          <div className="chatTop">
              <img src={friend ? public_folder_profile + friend : profile} alt="" className="chatImg"/>
              <div className="d-flex">
                <div>
                  <div style={{fontSize:"12px"}} className="ms-1">{name}</div>
                  <p className="chatText">{message}</p>
                </div>
                <Dropdown className="mt-4">
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
          </div>
              
      )}
          <div className='chatBottom'>{timeSince(chat.createdAt)}</div>
      </div>
      )
  }
};

export default Chat;
