import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const Message = ({ el }) => {
  const msg = useRef("");

  useEffect(() => {
    // To make new messages visible
    msg.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="message" ref={msg}>
      <p className="meta">
        {el.username}
        <span>{el.time}</span>
      </p>
      <p className="text">{el.text}</p>
    </div>
  );
};

Message.propTypes = {
  el: PropTypes.object,
};

export default Message;
