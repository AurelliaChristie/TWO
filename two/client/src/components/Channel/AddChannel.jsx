import "./Channel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddChannel = () => {
    return(
        <li className="channelList">
            <div className="channelImageContainer">
                <FontAwesomeIcon icon="plus"/>
            </div>
            <span className="channelListName">Add Channel</span>
        </li>
    )
} 

export default AddChannel;