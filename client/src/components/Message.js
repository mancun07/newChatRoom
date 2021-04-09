import React from "react";

const Message = ({ el }) => {
  return (
    <div className="message">
      <p className="meta">
        {el.username}
        <span>{el.time}</span>
      </p>
      <p className="text">{el.text}</p>
    </div>
  );
};

export default Message;
