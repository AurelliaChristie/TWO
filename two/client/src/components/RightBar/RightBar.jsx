import { Link } from "react-router-dom";
import profile from "../../assets/default_profile.jfif";

const RightBar = ({user}) => {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <div className="rightbar">
        <h4 className="rightbarTitle">User Info</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Division:</span>
            <span className="rightbarInfoValue">{user.division}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Interest:</span>
            <span className="rightbarInfoValue">{user.interest}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {user?.followings?.map((friend) => (
            <Link
              to={"/profile/" + friend.userId}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? public_folder + friend.profilePicture
                      : profile
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  export default RightBar;