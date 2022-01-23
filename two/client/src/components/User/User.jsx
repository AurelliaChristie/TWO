import "./User.css";
import profile from "../../assets/default_profile.jfif";

const User = ({ user, online }) => {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <li className="userList">
            <div className="userImageContainer">
                <img className="userListImage" src={user?.profilePicture ? public_folder+user.profilePicture : profile} alt=""/>
                <div className={online===true ? "onlineBadge" : "offlineBadge"}></div>
            </div>
            <span className="userListName">{user?.name}</span>
        </li>
    )
} 

export default User;