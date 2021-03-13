import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import {
  userMapStatetoProps,
  userMapDispatchtoProps,
} from "./states/userState";
import { connect } from "react-redux";
import { server_api } from "./api/api";
function Editprofile(props) {
  var formData = new FormData();
  const [edit, setEdit] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [file, setFile] = useState();
  return (
    <div
      className="head"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        top: 50,
        height: "91.5%",
      }}
    >
      <div
        style={{
          width: "700px",
          minHeight: "350px",
          background: "white",
          margin: "10px auto 0px",
        }}
      >
        {edit ? (
          <>
            <InputGroup
              className="mb-1 pt-3"
              style={{ justifyContent: "center" }}
            >
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  ชื่อบัญชีผู้ใช้งาน : {props.user.username}
                </InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
            <InputGroup className="mb-1" style={{ justifyContent: "center" }}>
              <div style={{ width: "45%" }}>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-default">
                    ชื่อจริง :
                  </InputGroup.Text>
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder={props.user.firstname}
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                  />
                </InputGroup.Prepend>
              </div>
            </InputGroup>
            <InputGroup className="mb-1" style={{ justifyContent: "center" }}>
              <div style={{ width: "45%" }}>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-default">
                    นามสกุล :
                  </InputGroup.Text>
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder={props.user.lastname}
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                  />
                </InputGroup.Prepend>
              </div>
            </InputGroup>
            <input
              type="file"
              onChange={(e) => {
                //console.log(e.target.files[0]);
                setFile(e.target.files[0]);
                setImgURL(e.target.files[0].name);
              }}
            />
            <br />
            {props.user.avatar === "" ? (
              <>
                <label>รูปโปรไฟล์</label>
                <br />
                <label>ยังไม่มีการบันทึก</label>
              </>
            ) : (
              <>
                <label>รูปโปรไฟล์</label>
                <br />
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                  }}
                  src={`${server_api}/${props.user.avatar}`}
                />
              </>
            )}
            <br />
            <Button
              className="mb-3 mt-3"
              onClick={() => {
                setEdit(false);
              }}
            >
              ยกเลิก
            </Button>
            <Button
              className="mb-3 ml-2 mt-3"
              onClick={async () => {
                if (imgURL !== "") {
                  formData.append("productImage", file);
                  formData.append("newFname", firstname);
                  formData.append("newLname", lastname);
                  formData.append("oldFname", props.user.firstname);
                  formData.append("oldLname", props.user.lastname);
                  axios({
                    url: `${server_api}/api/post/updateProfile`,
                    method: "post",
                    data: formData,
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: props.user.token,
                    },
                  }).then(async (res) => {
                    if (res.data.success) {
                      localStorage.setItem("token", res.data.data);
                    }
                    alert("แก้ไขข้อมูลสำเร็จ");
                    window.location.reload(true);
                  });
                } else {
                  axios({
                    url: `${server_api}/api/post/updateProfile`,
                    method: "post",
                    data: {
                      newFname: firstname,
                      newLname: lastname,
                      oldFname: props.user.firstname,
                      oldLname: props.user.lastname,
                      avatar: props.user.avatar,
                    },
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: props.user.token,
                    },
                  }).then((res) => {
                    if (res.data.success) {
                      localStorage.setItem("token", res.data.data);
                    }
                    alert("แก้ไขข้อมูลสำเร็จ");
                    window.location.reload(true);
                  });
                }
              }}
            >
              บันทึก
            </Button>
          </>
        ) : (
          <>
            <InputGroup
              className="mb-1 pt-3"
              style={{ justifyContent: "center" }}
            >
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  ชื่อบัญชีผู้ใช้งาน : {props.user.username}
                </InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
            <InputGroup className="mb-1 " style={{ justifyContent: "center" }}>
              <InputGroup.Prepend>
                {props.user.firstname === "" ? (
                  <InputGroup.Text id="inputGroup-sizing-default">
                    ชื่อจริง : ยังไม่มีการบันทึก
                  </InputGroup.Text>
                ) : (
                  <InputGroup.Text id="inputGroup-sizing-default">
                    ชื่อจริง : {props.user.firstname}
                  </InputGroup.Text>
                )}
              </InputGroup.Prepend>
            </InputGroup>
            <InputGroup className="mb-1 " style={{ justifyContent: "center" }}>
              <InputGroup.Prepend>
                {props.user.lastname === "" ? (
                  <InputGroup.Text id="inputGroup-sizing-default">
                    นามสกุล : ยังไม่มีการบันทึก
                  </InputGroup.Text>
                ) : (
                  <InputGroup.Text id="inputGroup-sizing-default">
                    นามสกุล : {props.user.lastname}
                  </InputGroup.Text>
                )}
              </InputGroup.Prepend>
            </InputGroup>
            <br />
            {props.user.avatar === "" ? (
              <>
                <label>รูปโปรไฟล์</label>
                <br />
                <label>ยังไม่มีการบันทึก</label>
              </>
            ) : (
              <>
                <label>รูปโปรไฟล์</label>
                <br />
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                  }}
                  src={`${server_api}/${props.user.avatar}`}
                />
              </>
            )}
            <br />
            <Button
              className="mb-3"
              onClick={() => {
                setEdit(true);
              }}
            >
              แก้ไขข้อมูล
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default connect(
  userMapStatetoProps,
  userMapDispatchtoProps
)(Editprofile);
