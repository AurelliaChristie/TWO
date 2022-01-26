import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import SideBar from '../../components/SideBar/SideBar';
import RoomName from '../../components/Chat/RoomName';
import Chat from '../../components/Chat/Chat';

import { AuthContext } from '../../contexts/AuthContext';

import "./ChannelPage.css";

const ChannelPage = () => {
  const [conv, setConv] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [members, setMembers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { channelId } = useParams();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  
  useEffect(() => {
      // Get arrival message
      user.socket?.on("getChannelMessage", (data) => {
        setArrivalMessage(data)
      })
  }, []);

  useEffect(() => {
    const getConversationData = async() => {
      try{
        const fetchConv = await axios.get(`http://localhost:8000/conversations/channels/${channelId}`);
        
        setConv(fetchConv.data);
        console.log(conv)
        user.socket?.emit("joinChannel", {
            channelId: channelId,
            channelName: fetchConv?.data.name,
            userId: user.loggedIn._id
        })

      } catch (error) {
        console.log(error)
      }
    }
    getConversationData();
  }, [channelId, user]);

  useEffect(() => {
    const fetchProfiles = () => {
        conv.members?.map(async (member) => {
            try{
                const fetchMemberProfile = await axios.get(`http://localhost:8000/users/${member}`);
                setMembers(previous => ([...previous, fetchMemberProfile?.data.data]));
            } catch (error) {
                console.log(error);
            }
        })
    };
    fetchProfiles();

    const getMessages = async () => {
        try{
            const fetchMessages = await axios.get(`http://localhost:8000/messages/${channelId}`);
            setMessages(fetchMessages.data);
        } catch (error) {
            console.log(error);
        }
    }
    getMessages();
}, [conv, channelId])

  useEffect(() => {
    if(arrivalMessage && channelId === arrivalMessage[0]?.conversationId === true){
      setMessages(arrivalMessage);
    }
  }, [arrivalMessage, channelId])

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
      channelName: conv?.name,
      conversationId: channelId
    };

    // Send message to the receiver using socket
    user.socket.emit("sendChannelMessage", message);
    setNewMessage("");
  };

  return (
      <div className='homeContainer'>
        <SideBar/>
        <div className='conversation'>
            <div className="chatBoxWrapper">
                <div>
                  <RoomName name={conv?.name} channel={true}/>
                </div>
                <div className="chatBoxTop">
                  {
                    messages?.map((m) => (
                      <div ref={scrollRef}  key={m._id}>
                          {/* {console.log(members)} */}
                        <Chat chat={m} mine={m.sender === user.loggedIn?._id} friend={members?.find(member => member._id === m.sender)?.profilePicture} name={members?.find(member => member._id === m.sender)?.name}/>
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

export default ChannelPage;
