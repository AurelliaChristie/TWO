import profile from "../../assets/default_profile.jfif";
import cover from "../../assets/welcome.png";

import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

      return(
        <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img
              className="profileCoverImg"
              src={
                user.coverPicture
                  ? public_folder + user.coverPicture
                  : cover
              }
              alt=""
            />
            <img
              className="profileUserImg"
              src={
                user.profilePicture
                  ? public_folder + user.profilePicture
                  : profile
              }
              alt=""
            />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.name}</h4>
            <span className="profileInfoDesc">{user.division} - {user.nation}</span>
            <span className="profileInfoDesc">Interest: {user.interest}</span>
            <div className="buttons mx-auto mt-2">
                <Link to="/profile/edit">
                <div className="btn btn-dark btn-md" style={{backgroundColor: "#1640E4", borderColor: "#1640E4"}}>Edit Profile</div>
                </Link>
            </div>
          </div>
        </div>
      </div>
      )
    
}

export default Profile;