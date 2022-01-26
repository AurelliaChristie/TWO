import "./Channel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Channel = ({ channel }) => {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <li className="channelList">
            <div className="channelImageContainer">
                <FontAwesomeIcon icon="hashtag"/>
            </div>
            <span className="channelListName">{channel?.name}</span>
        </li>
    )
} 

export default Channel;