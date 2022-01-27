import { useState, useEffect, useContext } from "react";
import axios from "axios";

import profile from "../../assets/default_profile.jfif";
import welcome from "../../assets/welcome.png";
import Timeline from "../Timeline/Timeline";
import RightBar from "../RightBar/RightBar";

import { AuthContext } from "../../contexts/AuthContext";

import "./Profile.css";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIsRTL } from "react-bootstrap/esm/ThemeProvider";

const Profile = ({ users }) => {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [cover, setCover] = useState(users.coverPicture);
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const handleCoverChange = async (e) => {
      e.preventDefault();
      const data = new FormData();
      const fileName = `${Date.now()}_${users._id}_${e.target.file[0].name}`;
      data.append("name", fileName);
      data.append("file", e.target.file[0]);
      try{
        await axios.post("http://localhost:8000/upload/user", e.target.file[0]);
      } catch (error) {
          console.log(error);
      }
      try{
       const updatedCover =  await axios.put(`http://localhost:8000/users/${users._id}`, {
          coverPicture: fileName
        });
        setCover(updatedCover.data.data.coverPicture);
      } catch (error) {
        console.log(error);
      }
    }

    const handleLogOut = (e) => {
      e.preventDefault();

      localStorage.removeItem('token');

      
      window.location.reload();
    }

    useEffect(() => {
        const getPosts = async ()  => {
          const fetchPosts = await axios.get(`http://localhost:8000/posts/profile/${users._id}`);
          setPosts(fetchPosts.data.data);
        }
        getPosts();
    }, [users])

    if(user.loggedIn !== null){
      return(
        <div className="feed">
        <div className="feedWrapper">
            <div className="feedPosts pb-5 mb-4">
          <div className="profileCover">
            <div>
              <img
                className="profileCoverImg"
                src={
                  cover
                    ? public_folder + cover
                    : welcome
                }
                alt=""
              />
              <div>
                <label htmlFor="file">
                  <FontAwesomeIcon icon = "edit" size="lg" className="editCover" style={{cursor: "pointer"}}/>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => handleCoverChange(e)}
                    />
                </label>
              </div>
            </div>
            <div>
              <img
                className="profileUserImg"
                src={
                  users?.profilePicture
                    ? public_folder + users?.profilePicture
                    : profile
                }
                alt=""
              />
              <div>
                <label htmlFor="file">
                  <FontAwesomeIcon icon = "edit" size="lg" className="editProfile" style={{cursor: "pointer"}}/>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => handleCoverChange(e)}
                    />
                </label>
              </div>
            </div>
          </div>
          <div className="profileInfo">
            <div className="d-flex">
            <h4 className="profileInfoName">{users.name}</h4>
            <Link to="/profile/edit" className="text-black">
              <FontAwesomeIcon icon = "pencil-alt" size="md" className="editFull ms-1 mt-2" style={{cursor: "pointer"}}/>
            </Link>
            </div>
            <span className="profileInfoDesc">{users.nation}</span>
            <div className="buttons mx-auto mt-2">
                <Link to="#">
                <div className="btn btn-dark btn-md" style={{backgroundColor: "red", borderColor: "red"}} onClick={(e) => handleLogOut(e)}>Log Out</div>
                </Link>
            </div>
          </div>
          <div className="profileRightBottom">
            <Timeline posts={posts} />
            {/* <RightBar users={user} /> */}
          </div>
        </div>
      </div>
      </div>
      )
    } else {
      return(
      <Navigate to="/"/>
      )
    }
      
    
}

export default Profile;