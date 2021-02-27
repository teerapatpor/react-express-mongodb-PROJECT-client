import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import {
  userMapStatetoProps,
  userMapDispatchtoProps,
} from "../states/userState";
import { connect } from "react-redux";
import { server_api } from "../api/api";
function Navbar(props) {
  const history = useHistory();
  useEffect(() => {
    // props.updateChatList();
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      axios({
        url: `${server_api}/api/user/token`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(async (res) => {
        if (res.data.success === true) {
          await props.userLogin(
            true,
            res.data.data._id,
            res.data.data.username,
            res.data.data.role,
            res.data.data.chatRecieverID,
            token
          );
          await props.updateChatList();
        } else {
          history.push("/ลงชื่อเข้าใช้");
        }
      });
    }
  }, []);
  return (
    <header className="Navbar">
      <label
        style={{ fontSize: "25px", fontWeight: "bold", cursor: "pointer" }}
        onClick={() => {
          history.push("/");
          window.location.reload(true);
        }}
      >
        ownerProject
      </label>
      <label style={{ float: "right" }}>{props.user.username}</label>
      {!props.user.login ? (
        <Link to={"/ลงชื่อเข้าใช้"}>
          <Button variant="outline-info" className="login">
            ลงชื่อเข้าใช้
          </Button>
        </Link>
      ) : (
        <Button
          variant="outline-info"
          className="login"
          onClick={() => {
            localStorage.removeItem("token");
            props.userLogout(props.user.socketID);
            alert("ออกจากระบบแล้ว");
            history.push("/");
          }}
        >
          ออกจากระบบ
        </Button>
      )}
    </header>
  );
}

export default connect(userMapStatetoProps, userMapDispatchtoProps)(Navbar);
