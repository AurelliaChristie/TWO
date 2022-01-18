import React from "react";
import { Carousel } from "react-bootstrap";
import GetConnected from "../../assets/GetConnected.svg"

import Help from "../../assets/Help.svg"

function Layer2(){
    return(
        <div className="carousel" style={{backgroundColor: "#163fe486"}}>
            <h1 style={{textAlign: "center", padding: "30px 0px 30px 0px", color: "#1640E4", fontWeight: "bold"}}>Our Main Features</h1>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={GetConnected}
                    width="250px"
                    height= "250px"
                    alt="First slide"
                    />
                    <h2 style={{textAlign: "center", color:"white", margin:"40px"}}>Get Connected</h2>
                    <h4 style={{textAlign: "center", color:"white", margin:"40px"}}>Get to know and have daily conversation with the other volunteers from all over the ASEAN regions.</h4>
                    <br></br><br></br>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Help}
                    width="250px"
                    height= "250px"
                    alt="Second slide"
                    />
                    <h2 style={{textAlign: "center", color:"white", margin:"40px"}}>Help Each Other</h2>
                    <h4 style={{textAlign: "center", color:"white", margin:"40px"}}>Get help if you need one or help the other volunteers if they need your help. </h4>
                    <br></br><br></br>
                </Carousel.Item>
            </Carousel>
            
        </div>
    )
}

export default Layer2;