import React from 'react';
import "./Chat.css";

export default function Chat({mine}) {
  return (
  <div className={mine ? "chat mine": "chat"}>
      <div className="chatTop">
          <img src="https://pbs.twimg.com/media/D8Dp0c5WkAAkvME.jpg" alt="" className="chatImg"/>
          <p className="chatText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident nam placeat quae earum, adipisci obcaecati fugiat iusto. Iure eligendi fugit accusamus error, itaque nesciunt quasi quisquam odio natus velit illum.</p>
      </div>
      <div className='chatBottom'>1 hour ago</div>
  </div>
  );
}
