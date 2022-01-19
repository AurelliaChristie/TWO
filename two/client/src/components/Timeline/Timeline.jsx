import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Post from "../Post/Post";
import "./Timeline.css";
import CreatePost from "../Post/CreatePost";
import { AuthContext } from "../../contexts/AuthContext";

const Timeline = () => {
  const {user} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async ()  => {
      const fetchPosts = await axios.get(`http://localhost:8000/posts/timeline/${user._id}`);
      setPosts(fetchPosts.data.data);
    }
    getPosts();
  }, [])

  return (
    <div className="feed mb-4">
      <div className="px-3 py-5 mt-2 mb-4">
        <CreatePost user={user._id}/>
        {posts?.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;