import React, { useState } from 'react';
import Chat from '../../components/Chat/Chat';
import SideBar from '../../components/SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./Conversation.css";

export default function Conversation() {
  const [text, setText] = useState("");

  const autoResize = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`; 
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, 130)}px`;
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
      <div className='homeContainer'>
        <SideBar/>
        <div className='conversation'>
            <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                  <Chat />
                  <Chat mine={true}/>
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    className='chatInput'
                    placeholder='Write something...'
                    onInput={(e) => autoResize(e)}
                    onChange={(e) => handleTextChange(e)}
                    value={text}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
            </div>
        </div>
      </div>
  );
}
