import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import User from "../User/User";
import profile from "../../assets/default_profile.jfif";

import "./SideBar.css";

import { Users } from "../../dummyData";

const SideBar = () => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

  return(
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" className="text-decoration-none text-white">
              <FontAwesomeIcon icon="rss" />
              <span className="sidebarListItemText ms-3">Timeline</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon="users" />
            <span className="sidebarListItemText ms-3">Channels</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon="comment" />
            <span className="sidebarListItemText ms-3">Direct Messages</span>
          </li>
          <ul className="sidebarUserList">
            {Users.map((user) => (
              <Link to={`/dm/${user._id}`} className="text-decoration-none text-white">
                <User key={user._id} user={user}/>
              </Link>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  )
};

export default SideBar;