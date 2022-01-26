import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import SideBar from '../../components/SideBar/SideBar';
import RoomName from '../../components/Chat/RoomName';
import Chat from '../../components/Chat/Chat';

import { AuthContext } from '../../contexts/AuthContext';

import "./ConversationPage.css";

const ConversationPage = () => {
  const [convId, setConvId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [friend, setFriend] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { friendId } = useParams();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  
  useEffect(() => {
      // Get arrival message
      user.socket?.on("getDirectMessage", (data) => {
        setArrivalMessage(data)
      })
  }, []);

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
        const fetchConv = await axios.get(`http://localhost:8000/conversations/dm/${user?.loggedIn?._id}/${friendId}`);
        
        if(fetchConv.data === null){
          user.socket?.emit("createConversation", {
            name: "",
            senderId: user.loggedIn?._id,
            receiverId: friendId
          }, function(response){
            setConvId(response.conversationId);
          })
        } else {
          setConvId(fetchConv.data._id);
        }
      } catch (error) {
        console.log(error)
      }
    }
    getConversationId();
  }, [user, friendId]);

  useEffect(() => {
    if(arrivalMessage && convId === arrivalMessage[0]?.conversationId === true){
      setMessages(arrivalMessage);
    }
  }, [arrivalMessage, convId])

  useEffect(() => {
    const getMessages = async () => {
      if(convId){
        try{
          const fetchMessages = await axios.get(`http://localhost:8000/messages/${convId}`);
          setMessages(fetchMessages.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getMessages();
  }, [convId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  const autoResize = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`; 
    e.target.style.height = `${Math.min(e.target.scrollHeight, 130)}px`;
  };

  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user.loggedIn._id,
      receiver: friendId, 
      text: newMessage,
      conversationId: convId
    };

    // Send message to the receiver using socket
    user.socket.emit("sendDirectMessage", message);
    setNewMessage("");
  };

  return (
      <div className='homeContainer'>
        <SideBar/>
        <div className='conversation'>
            <div className="chatBoxWrapper">
                <div>
                  <RoomName name={friend.name}/>
                </div>
                <div className="chatBoxTop">
                  {
                    messages?.map((m) => (
                      <div ref={scrollRef}  key={m._id}>
                      <Chat chat={m} mine={m.sender === user.loggedIn._id} friend={m.sender === user.loggedIn._id ? user.loggedIn.profilePicture : friend.profilePicture}/>
                      </div>
                    ))
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
