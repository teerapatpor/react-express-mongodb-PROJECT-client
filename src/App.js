import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Form from "./form";
import Home from "./home";
import login from "./login";
import register from "./register";
import ChatLobby from "./ChatLobby";
import Chatroom from "./Chatroom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { server_api } from "./api/api";
const ENDPOINT = server_api;
export const socket = socketIOClient(ENDPOINT);

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/เพิ่มฟอร์ม" component={Form} />
          <Route path="/ลงชื่อเข้าใช้" component={login} />
          <Route path="/สมัครสมาชิก" component={register} />
          <Route path="/สนทนา" component={ChatLobby} />
          <Route path="/ห้องสนทนา" component={Chatroom} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
