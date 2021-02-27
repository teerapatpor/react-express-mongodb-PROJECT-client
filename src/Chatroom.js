import "./App.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Chat from "./components/Chat";
import { Ring } from "react-awesome-spinners";
import {
  userMapDispatchtoProps,
  userMapStatetoProps,
} from "./states/userState";
import { connect } from "react-redux";
import { socket } from "./App";
import { server_api } from "./api/api";
function Chatroom(props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.updateChat([]);
    // do it before can resolve
    // socket.on("recieve_message", (data) => {
    //   console.log(props);
    //   props.updateChat(data);
    // });
    socket.on("recieve_message", (data) => {
      props.updateChatmessage(data);
      if (!props.user.chatRecieverID.includes(data.senderID)) {
        var arr = props.user.chatRecieverID;
        arr.push(data.senderID);
        props.userFetchChat(arr);
      }
    });

    axios({
      url: `${server_api}/api/chat/information`,
      method: "post",
      data: { recieverID: props.location.state.id },
      headers: {
        "Content-Type": "application/json",
        Authorization: props.user.token,
      },
    }).then(async (result) => {
      await props.updateChat(result.data.data.history);
      setLoading(false);
    });
  }, []);
  function sendChat() {
    props.updateChat([
      ...props.chat,
      { senderID: props.location.state.user._id, message: text },
    ]);
    setText("");
    console.log("text", text);
    if (!props.user.chatRecieverID.includes(props.location.state.id)) {
      var arr = props.user.chatRecieverID;
      arr.push(props.location.state.id);
      props.userFetchChat(arr);
      axios({
        url: `${server_api}/api/chat/create`,
        method: "post",
        data: { recieverID: props.location.state.id },
        headers: {
          "Content-Type": "application/json",
          Authorization: props.user.token,
        },
      });
    }
    socket.emit("message", {
      message: text,
      msgType: "text",
      senderID: props.location.state.user._id,
      recieverID: props.location.state.id,
      socketReciever: props.location.state.socketID,
    });
  }
  return (
    <div
      className="ChatRoom"
      style={{
        position: "absolute",
        top: 0,
        right: 1,
        top: 50,
        height: "665px",
      }}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          sendChat();
        }
      }}
    >
      <div
        style={{
          background: "white",
          height: "500px",
          width: "60%",
          margin: "40px auto",
        }}
      >
        <label
          style={{
            background: "black",
            color: "white",
            width: "100%",
            height: "5%",
            margin: "0",
          }}
        >
          {props.location.state.username}
        </label>
        <div
          style={{
            background: "grey",
            width: "100%",
            height: "85%",
            border: "4px solid black",
            flex: 1,
            overflow: "auto",
          }}
        >
          {loading ? (
            <Ring style={{ size: 64, color: "#00bfff", sizeUnit: "px" }} />
          ) : (
            <Container>
              {props.chat.map((msg, index) => {
                return (
                  <Row key={index}>
                    <Col>
                      <Chat
                        senderID={msg.senderID}
                        message={msg.message}
                        uid={props.location.state.user._id}
                      />
                    </Col>
                  </Row>
                );
              })}
            </Container>
          )}
        </div>
        <input
          type="text"
          style={{
            width: "90%",
            height: "10%",
            border: "4px solid black",
            float: "left",
            display: "inline-block",
            paddingLeft: "10px",
          }}
          placeholder="type here"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          style={{
            float: "right",
            width: "10%",
            height: "10%",
            borderRadius: "0",
            border: "0",
          }}
          onClick={() => {
            sendChat();
          }}
        >
          send
        </Button>
      </div>
    </div>
  );
}

export default connect(userMapStatetoProps, userMapDispatchtoProps)(Chatroom);
