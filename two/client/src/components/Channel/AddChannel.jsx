import "./AddChannel.css";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddChannel = () => {
    const handleSubmit = () => {}
    const handleChannelChange = () => {}
    return(
        <li className="addChannelList">
            <span className="addChannelListName">
                <Form.Control type="text" placeholder="New Channel"  onChange={(e) => handleChannelChange(e)}/>
            </span>
            <div className="addChannelImageContainer ms-3">
                <FontAwesomeIcon icon="plus"/>
            </div>
        </li>
    )
} 

export default AddChannel;