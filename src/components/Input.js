import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { server_api } from "../api/api";
// axios.create({
//   baseURL: "http://localhost:8888/api/image",
//   headers: {
//     "Content-type": "application/json",
//   },
// });

function Input({ addForm }) {
  var formData = new FormData();
  const [nameForm, setNameForm] = useState("");
  const [detail, setDetail] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [file, setFile] = useState();

  function onClick() {
    if (nameForm !== "" && imgURL !== "") {
      formData.append("productImage", file);
      formData.append("name", nameForm);
      formData.append("detail", detail);

      axios({
        url: `${server_api}/api/post/create`,
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((result) => {
        addForm(result.data.data);
        alert("บันทึกสำเร็จ");
        window.location.reload(true);
      });
    }
  }
  return (
    <div>
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
        <div className="Input__header">create form</div>
        <div className="Input">
          <span>ชื่อ</span>
          <input
            className="Input__field"
            type="text"
            placeholder="ใส่ชื่อของ ฟอร์มนี้"
            onChange={(e) => {
              setNameForm(e.target.value);
            }}
          />
          <br></br>
          <span>รายละเอียด</span>
          <input
            className="Input__field"
            type="text"
            placeholder="ใส่รายละเอียดเพิ่มเติม"
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          />
          <br></br>
          <span>ไฟล์รูป </span>
          <input
            type="file"
            onChange={(e) => {
              //console.log(e.target.files[0]);
              setFile(e.target.files[0]);
              setImgURL(e.target.files[0].name);
            }}
          />
          <br></br>
          <Button onClick={onClick}>บันทึกข้อมูล</Button>
        </div>
      </div>
    </div>
  );
}

export default Input;
