import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import SideBar from '../../components/SideBar/SideBar';
import RoomName from '../../components/Chat/RoomName';
import Chat from '../../components/Chat/Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AuthContext } from '../../contexts/AuthContext';
import { SocketContext } from '../../contexts/SocketContext';

import "./ConversationPage.css";

const ConversationPage = () => {
  const [convId, setConvId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [friend, setFriend] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sockets, setSockets] = useState(null);
  const { friendId } = useParams();
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const scrollRef = useRef();

  useEffect(() => {
    if(socket !== null){
        setOnlineUsers(socket?.onlineUsers)
        setSockets(socket?.socket)
        console.log(socket)
    }
}, [socket])

  useEffect(() => {
      // Get arrival message
      sockets?.on("getDirectMessage", (data) => {
        setArrivalMessage({
          conversationId: convId,
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now()
        });
      });
  }, []);

  useEffect(() => {
    arrivalMessage && friendId === arrivalMessage?.sender && 
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, friendId])

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
  }, [user, friendId]);

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
      text: newMessage,
      conversationId: convId
    };

    // Send message to the receiver using socket
    const a = {
      senderId: user.loggedIn._id,
      receiverId: friendId,
      text: newMessage
    };
    console.log(sockets)
    sockets?.emit("sendDirectMessage", a);

    try{
      const res = await axios.post("http://localhost:8000/messages/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className='homeContainer'>
        <SideBar onlineUsers={onlineUsers}/>
        <div className='conversation'>
            <div className="chatBoxWrapper">
                <div>
                  <RoomName name={friend.name}/>
                </div>
                <div className="chatBoxTop">
                  {
                    messages?.map((m) => (
                      <div ref={scrollRef}  key={m._id}>
                      <Chat chat={m} mine={m.sender === user.loggedIn._id} friend={friend.profilePicture}/>
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
