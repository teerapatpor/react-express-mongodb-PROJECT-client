import Login from "./components/Login";
import "./App.css";
import { connect } from "react-redux";
import {
  userMapStatetoProps,
  userMapDispatchtoProps,
} from "./states/userState";

function login(props) {
  function userLogin(_id, username, role, chatRecieverID, token) {
    props.userLogin(true, _id, username, role, chatRecieverID, token);
    props.updateChatList();
  }
  return (
    <>
      <Login userLogin={userLogin} sWord="login" />
    </>
  );
}

export default connect(userMapStatetoProps, userMapDispatchtoProps)(login);
