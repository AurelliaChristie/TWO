import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import SideBar from '../../components/SideBar/SideBar';
import RoomName from '../../components/Chat/RoomName';
import Chat from '../../components/Chat/Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AuthContext } from '../../contexts/AuthContext';

import "./ConversationPage.css";

const ConversationPage = () => {
  const [convId, setConvId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [friend, setFriend] = useState({});
  const { friendId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getFriendProfile = async() => {
      try{
        const fetchProfile = await axios.get(`http://localhost:8000/users/${friendId}`);
        setFriend(fetchProfile.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriendProfile();

    const getConversationId = async() => {
      try{
        const fetchConv = await axios.get(`http://localhost:8000/conversations/${user.loggedIn._id}/${friendId}`);

        if(fetchConv.data === null){
          try{
            const createConv = await axios.post(`http://localhost:8000/conversations`, {
              senderId: user.loggedIn._id,
              receiverId: friendId
            });
            setConvId(createConv?.data._id);
          } catch(error) {
            console.log(error)
          }
        } else {
          setConvId(fetchConv.data._id);
        }
      } catch (error) {
        console.log(error)
      }
    }
    getConversationId();
  }, [friendId]);

  useEffect(() => {
    const getMessages = async () => {
      try{
        const fetchMessages = await axios.get(`http://localhost:8000/messages/${convId}`);
        setMessages(fetchMessages.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, [convId]);

  const autoResize = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`; 
    e.target.style.height = `${Math.min(e.target.scrollHeight, 130)}px`;
  };

  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
      <div className='homeContainer'>
        <SideBar/>
        <div className='conversation'>
            <div className="chatBoxWrapper">
                <div>
                  <RoomName name={friend.name}/>
                  This is the beginning of your Direct Message with {friend.name}.
                </div>
                <div className="chatBoxTop">
                  {
                    messages?.map((m) => {
                      <Chat chat={m} mine={m.sender === user.loggedIn._id}/>
                    })
                  }
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    className='chatInput'
                    placeholder='Write something...'
                    onInput={(e) => autoResize(e)}
                    onChange={(e) => handleTextChange(e)}
                    value={newMessage}
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

export default ConversationPage;
