import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { server_api } from "./api/api";
//import { socket } from "./App";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:8888/";
function ChatLobby(props) {
  const history = useHistory();
  useEffect(() => {
    props.updateChatList();
    localStorage.setItem("latest-chat", "");
    console.log("props: ", props.user);
    if (
      props.user.avatar === "" ||
      props.user.firstname === "" ||
      props.user.lastname === ""
    ) {
    }
  }, []);

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
          minHeight: "500px",
          margin: "30px auto",
        }}
      >
        {props.user.login ? (
          <>
            {props.user.avatar === "" ||
            props.user.firstname === "" ||
            props.user.lastname === "" ? (
              <>
                <label className="bg-warning w-100 mt-3">
                  กรุณาลงแก้ไขข้อมูลส่วนตัวให้ครบถ้วน
                </label>
                <br />
                <Button
                  onClick={() => {
                    history.push("/แก้ไขข้อมูลส่วนตัว");
                  }}
                >
                  แก้ไขส่วนตัว
                </Button>
              </>
            ) : (
              <Container>
                {Object.keys(props.chatList).map((value, index) => {
                  return (
                    <Row key={index}>
                      <Col style={{ margin: "10px auto" }}>
                        {props.chatList[value].firstname === "" ||
                        props.chatList[value].lastname === "" ||
                        props.chatList[value].avatar === "" ? (
                          <></>
                        ) : (
                          <Button
                            className="chatItem"
                            variant="outline-secondary"
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              overflow: "hidden",
                            }}
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
                            <img
                              style={{
                                margin: "-7px 0 0 -11px",
                                width: "100px",
                                height: "100px",
                                float: "left",
                              }}
                              src={`${server_api}/${props.chatList[value].avatar}`}
                            />
                            <div
                              style={{
                                marginTop: "20px",
                              }}
                            >
                              {props.chatList[value].firstname}{" "}
                              {props.chatList[value].lastname}
                            </div>
                          </Button>
                        )}
                      </Col>
                    </Row>
                  );
                })}
              </Container>
            )}
          </>
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
