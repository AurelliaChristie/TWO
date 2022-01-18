import "./SideBar.css";

import { Users } from "../../dummyData";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItemText">Groups</span>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default SideBar;