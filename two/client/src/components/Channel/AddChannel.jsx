import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from "../../contexts/AuthContext";

import "./AddChannel.css";

const AddChannel = () => {
    const navigate = useNavigate();
    const [channel, setChannel] = useState("");
    const { user } = useContext(AuthContext);
    const handleChannelChange = (e) => {
       setChannel(e.target.value); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        user.socket?.emit("createConversation", {
            name: channel,
            senderId: user.loggedIn?._id
        }, function(response){
            navigate(`/chat/channels/${response.conversationId}`, {replace: true});
        
            setChannel("");
        })
    }
    return(
        <li className="addChannelList">
            <span className="addChannelListName">
                <Form.Control type="text" placeholder="New Channel"  onChange={(e) => handleChannelChange(e)} value={channel}/>
            </span>
            <div className="addChannelImageContainer">
                <button className="btn btn-dark btn-md" type="submit" onClick={handleSubmit}><FontAwesomeIcon icon="plus"/></button>
            </div>
        </li>
    )
} 

export default AddChannel;