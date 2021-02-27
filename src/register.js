import Login from "./components/Login";
import "./App.css";
import { connect } from "react-redux";
import {
  userMapStatetoProps,
  userMapDispatchtoProps,
} from "./states/userState";
function register(props) {
  function userCheck(username, password) {
    props.userCheck(true, username, password);
  }
  return <Login userCheck={userCheck} sWord="register" />;
}

export default connect(userMapStatetoProps, userMapDispatchtoProps)(register);
