import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RoomName.css";

const RoomName = ({name}) => {
  return (
    <div className="top-bar">
      <div className="name ps-4 pt-3"><h5>{name}</h5></div>
      <div className="menu pt-3">
        <FontAwesomeIcon icon="ellipsis-v"/>
      </div>
    </div>
  )
};

export default RoomName;