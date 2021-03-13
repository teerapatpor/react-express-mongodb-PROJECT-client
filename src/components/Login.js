import React, { useState } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
// import FacebookLogin from "react-facebook-login";
import { server_api } from "../api/api";
function Login({ sWord, userLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [errMsg, setErrMsg] = useState("");
  const responseFacebook = (response) => {
    console.log(response);
  };
  function auth() {
    if (sWord === "login") {
      axios({
        url: `${server_api}/api/user/login`,
        method: "post",
        data: { username: username, password: password },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.data.status === true) {
          userLogin(
            res.data.data.resultLogin._id,
            res.data.data.resultLogin.username,
            res.data.data.resultLogin.firstname,
            res.data.data.resultLogin.lastname,
            res.data.data.resultLogin.avatar,
            res.data.data.resultLogin.role,
            res.data.data.resultLogin.chatRecieverID,
            res.data.data.token
          );
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("userID", res.data.data.resultLogin._id);
          alert("เข้าสู่ระบบสำเร็จ");
          history.push("/");
        } else {
          setErrMsg(res.data.data.errMsg);
        }
      });
    } else {
      axios({
        url: `${server_api}/api/user/register`,
        method: "post",
        data: { username: username, password: password },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res.data.data.status);
        if (res.data.data.status === true) {
          alert("สมัครสมาชิกสำเร็จ");
          history.push("./ลงชื่อเข้าใช้");
        } else {
          setErrMsg("ไม่สามารถใช้ชื่อผู้ใช้งานนี้ได้");
        }
      });
    }
  }

  return (
    <header
      className="login_form"
      style={{ position: "absolute", top: 0, right: 0, top: 50 }}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          auth();
        }
      }}
    >
      <div
        style={{
          width: "700px",
          height: "250px",
          background: "white",
          margin: "10px auto 0px",
        }}
      >
        <label className="login_label">
          ชื่อผู้เข้าใช้งาน
          <input
            type="text"
            className="login_text"
            placeholder="ตัวอย่าง example1234"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="login_label">
          รหัสผ่าน
          <input
            type="text"
            className="login_text"
            placeholder="ตัวอย่าง 123456789"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {sWord === "login" ? (
          <div>
            <Button variant="secondary" style={{ right: 0 }} onClick={auth}>
              เข้าสู่ระบบ
            </Button>
            <br />
            <label className="login_label">
              หากยังไม่มีข้อมูล
              <Link to="/สมัครสมาชิก">สมัครสมาชิก</Link>
            </label>
            <br />
          </div>
        ) : (
          <div>
            <Button style={{ right: 0 }} variant="secondary" onClick={auth}>
              สมัครสมาชิก
            </Button>
          </div>
        )}
      </div>
      <label className="bg-danger text-white mt-0" style={{ width: "700px" }}>
        {errMsg}
      </label>
    </header>
  );
}

export default Login;
