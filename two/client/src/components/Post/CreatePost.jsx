import { useContext, useRef, useState } from "react";
import axios from "axios";

import { Users } from "../../dummyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import profile from "../../assets/default_profile.jfif";

import "./CreatePost.css";

const CreatePost = ({ user }) => {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    const caption = useRef();
    const [file, setFile] = useState(null);
    
    const submitHandler = async (event) => {
        event.preventDefault();
        const newPost = {
            userId: user._id,
            caption: caption.current.value
        };
        console.log(newPost)
        if(file){
            const data = new FormData();
            const fileName = `${Date.now()}_${user._id}_${file.name}`;
            data.append("name", fileName);
            data.append("file", file);
            newPost.image = fileName;
            try{
                await axios.post("http://localhost:8000/upload/post", data);
            } catch (error) {
                console.log(error);
            }
        }

        try{
            await axios.post("http://localhost:8000/posts", newPost);
            window.location.reload();
        } catch(error) {
            console.log(error);
        };
    }

    return(
        <div className="p-2">
            <div className="bg-white border mt-2">
            <div className="d-flex flex-row justify-content-between align-items-center px-2 py-4">
              <div className="d-flex flex-row align-items-center px-2">
                    <img className="rounded-circle me-2" 
                        src={
                            user.profilePicture ?
                            public_folder + user.profilePicture :
                            profile
                        } 
                        width="45" 
                        alt="Profile"
                    />
                    <input
                        placeholder="What's on your mind?"
                        className="captionInput"
                        ref={caption}
                    />
              </div>
            </div>
            <hr className="mx-auto" style={{width: "95%"}}/>
            {file && (
                <div className="imageContainer">
                    <img className="image" src={URL.createObjectURL(file)} alt="" />
                    <FontAwesomeIcon icon="times-circle" className="cancelImage" size="lg" color="red" onClick={() => setFile(null)} />
                </div>
            )}
            <form onSubmit = {submitHandler}>
                <div className="d-flex justify-content-start p-2 px-3 py-3">
                    <div style={{cursor: "pointer"}}>
                        <label htmlFor="file">
                            <FontAwesomeIcon icon="images" className="me-2" size="lg"/>
                            <span>Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </div>
                    <div className="buttons ms-auto">
                        <button className="btn btn-dark btn-md" style={{marginRight: "20px", backgroundColor: "#1640E4", borderColor: "#1640E4"}} type="submit">Share</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    )
}

export default CreatePost;