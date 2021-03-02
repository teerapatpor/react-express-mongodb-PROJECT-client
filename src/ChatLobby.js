import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
//import { socket } from "./App";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:8888/";
function ChatLobby(props) {
  useEffect(() => {
    props.updateChatList();
    localStorage.setItem("latest-chat", "");
  }, []);
  const history = useHistory();

  return (
    <div
      className="head"
      style={{
        position: "absolute",
        top: 0,
        right: 1,
        top: 50,
        height: "91.5%",
      }}
    >
      <div
        style={{
          background: "white",
          width: "80%",
          height: "80%",
          margin: "30px auto",
        }}
      >
        {props.user.login ? (
          <Container>
            {Object.keys(props.chatList).map((value, index) => {
              return (
                <Row key={index}>
                  <Col style={{ margin: "10px auto" }}>
                    <Button
                      onClick={() => {
                        history.push({
                          pathname: "/ห้องสนทนา",
                          state: {
                            id: props.chatList[value].userID,
                            username: props.chatList[value].name,
                            user: props.user,
                            socketID: props.chatList[value].socketID,
                          },
                        });
                      }}
                    >
                      {props.chatList[value].name}
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Container>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    form: state.form,
    chatList: state.chatList,
  };
};
const mapDispatchtoProps = (dispatch, props) => {
  return {
    changeForm: (form) => {
      dispatch({
        type: "changeForm",
        item: form,
      });
    },
    userLogin: (login, _id, username, role, chatRecieverID, token) => {
      dispatch({
        type: "login",
        payload: {
          login,
          _id,
          username,
          role,
          chatRecieverID,
          token,
        },
      });
    },
    updateChatList: () => {
      // props.socket.emit("fetch_chat", "chat");
      // props.socket.on("chat_list", (data) => {
      //   dispatch({
      //     type: "chatUpdate",
      //     payload: data,
      //   });
      // });
    },
  };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(ChatLobby);
