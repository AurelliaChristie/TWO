import { useContext } from "react";

import Post from "../Post/Post";
import "./Timeline.css";
import CreatePost from "../Post/CreatePost";
import { AuthContext } from "../../contexts/AuthContext";

const Timeline = ({posts}) => {
  const {user} = useContext(AuthContext);
  
  return (
    <div className="feed mb-4">
      <div className="px-3 mb-4">
        <CreatePost user={user.loggedIn}/>
        {posts?.map((p) => (
          <Post key={p._id} post={p} currentUser={user.loggedIn}/>
        ))}
      </div>
    </div>
  );
};

export default Timeline;