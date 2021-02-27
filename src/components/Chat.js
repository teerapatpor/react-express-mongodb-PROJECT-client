import React from "react";
function Chat(props) {
  return (
    <div className="Chat__display">
      {props.senderID !== props.uid ? (
        <div
          className="Chat__box"
          style={{
            float: "left",
            background: "white",
            color: "black",
          }}
        >
          <label
            style={{
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            {props.message}
          </label>
        </div>
      ) : (
        <div
          className="Chat__box"
          style={{
            float: "right",
            background: "black",
            color: "white",
          }}
        >
          <label
            style={{
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            {props.message}
          </label>
        </div>
      )}
    </div>
  );
}

export default Chat;
