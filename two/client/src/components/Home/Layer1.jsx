import React from "react";
import "../Home/Home.css"
import Welcome from "../../assets/Welcome.svg"
import { Link } from "react-router-dom";

function Layer1(){
        return(
            <div className="card1">
                    <div className="row no-gutters">             
                        <div className="col isinya">
                            <div className="card-block px-2 margin">
                                <h1 className="card-title Title1" style={{color: "#1640E4", fontWeight: "bold"}}>Welcome to TWO!</h1>
                                <p className="card-text isinya-text">“Together We're One” is a new web application for ASEAN Youth Organization’s Volunteer to communicate without having to deal with language barriers. Using this app, they can share their interests to each other, help each other, and many more!</p>
                                <div className="buttons">
                                    <Link to="/signup" className="btn btn-dark btn-lg" style={{marginRight: "20px", backgroundColor: "#1640E4", borderColor: "#1640E4"}}>Sign Up Now!</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto">
                            <img src={Welcome} className="img-fluid margin" alt="" width="600px" height="600px"/>
                        </div> 
                    </div>
            </div>
        )
    }

export default Layer1;