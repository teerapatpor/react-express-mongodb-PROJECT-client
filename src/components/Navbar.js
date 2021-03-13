import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
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
            res.data.data.firstname,
            res.data.data.lastname,
            res.data.data.avatar,
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

      {!props.user.login ? (
        <Link to={"/ลงชื่อเข้าใช้"}>
          <Button variant="outline-info" className="login">
            ลงชื่อเข้าใช้
          </Button>
        </Link>
      ) : (
        <>
          <Button
            variant="outline-info"
            style={{ float: "right" }}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userID");
              props.userLogout(props.user.socketID);
              alert("ออกจากระบบแล้ว");
              history.push("/");
            }}
          >
            ออกจากระบบ
          </Button>
          <DropdownButton
            id="dropdown-basic-button"
            variant="outline-primary"
            title="Setting"
            style={{ float: "right", marginRight: "20px" }}
          >
            <Dropdown.Item href="แก้ไขข้อมูลส่วนตัว">
              edit Profile
            </Dropdown.Item>
          </DropdownButton>
        </>
      )}
    </header>
  );
}

export default connect(userMapStatetoProps, userMapDispatchtoProps)(Navbar);
