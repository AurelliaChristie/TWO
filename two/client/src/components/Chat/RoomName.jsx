import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RoomName.css";

const RoomName = ({name, channel}) => {
  if(channel){
    return (
      <div className="top-bar">
        <div className="pt-3 ps-3 ms-2">
        <FontAwesomeIcon icon="hashtag"/>
        </div>
        <div className="name ms-2 ps-4 pt-3"><h5>{name}</h5></div>
        <div className="menu pt-3">
          <FontAwesomeIcon icon="ellipsis-v"/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="top-bar">
        <div className="name ps-4 pt-3"><h5>{name}</h5></div>
        <div className="menu pt-3">
          <FontAwesomeIcon icon="ellipsis-v"/>
        </div>
      </div>
    )
  }
  
};

export default RoomName;