import { store } from "../index";
import { socket } from "../App";

export const userMapStatetoProps = (state) => {
  return {
    user: state.user,
    chatList: state.chatList,
    chat: state.chat,
  };
};
export const userMapDispatchtoProps = (dispatch) => {
  return {
    userLogin: (login, _id, username, role, chatRecieverID, token) => {
      socket.emit("user_login", {
        id: _id,
        username: username,
      });
      socket.on("user_socketID", (data) => {
        dispatch({
          type: "login",
          payload: {
            login,
            _id,
            username,
            role,
            chatRecieverID,
            token,
            socketID: data,
          },
        });
      });
    },
    userLogout: (socketID) => {
      socket.emit("user_logout", socketID);
      dispatch({
        type: "logout",
      });
    },
    userFetchChat: (chat) => {
      dispatch({
        type: "fetchChat",
        payload: chat,
      });
    },
    updateChatList: () => {
      socket.emit("fetch_chat", "chat");
      socket.on("chat_list", async (data) => {
        delete data[store.getState().user.socketID];
        console.log("data", data);
        await dispatch({
          type: "chatListUpdate",
          payload: data,
        });
      });
    },
    updateChatmessage: (value) => {
      console.log("value:", value, "store get :", store.getState());
      dispatch({
        type: "chat",
        payload: [...store.getState().chat, value],
      });
    },
    updateChat: (value) => {
      dispatch({
        type: "chat",
        payload: value,
      });
    },
  };
};
