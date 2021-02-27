import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { createStore, combineReducers } from "redux";
const formState = [];
const formReducer = (state = formState, action) => {
  switch (action.type) {
    case "changeForm":
      state = action.item;
      break;
    case "like":
      console.log(action);
      state = {
        ...state,
      };
      console.log("state", state);
      // state.map((res) => {
      //   if (res._id === action.payload.ID) {
      //     res.userList.push(action.payload.userID);
      //     res.score += 1;
      //     return;
      //   }
      // });
      break;
    default:
      break;
  }
  return state;
};
const userState = {
  login: false,
  _id: "",
  username: "",
  role: "",
  chatRecieverID: [],
  token: "",
  socketID: "",
};
const userCheckReducer = (state = userState, action) => {
  switch (action.type) {
    case "login":
      state = {
        ...state,
        login: action.payload.login,
        _id: action.payload._id,
        username: action.payload.username,
        role: action.payload.role,
        chatRecieverID: action.payload.chatRecieverID,
        token: action.payload.token,
        socketID: action.payload.socketID,
      };
      break;
    case "logout":
      state = {
        ...state,
        login: false,
        _id: "",
        username: "",
        role: "",
        chatRecieverID: [],
        token: "",
        socketID: "",
      };
      break;
    case "fetchChat":
      state = {
        ...state,
        chatRecieverID: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};
const chatListReducer = (state = [], action) => {
  switch (action.type) {
    case "chatListUpdate":
      state = action.payload;
      break;

    default:
      break;
  }
  return state;
};

const chat = (state = [], action) => {
  switch (action.type) {
    case "chat":
      state = action.payload;
      break;

    default:
      break;
  }

  return state;
};

export const store = createStore(
  combineReducers({
    form: formReducer,
    user: userCheckReducer,
    chatList: chatListReducer,
    chat: chat,
  })
);

store.subscribe(() => {
  console.log("store:", store.getState());
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
