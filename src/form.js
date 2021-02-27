import "./App.css";
import Input from "./components/Input";
import { connect } from "react-redux";
import { useEffect } from "react";
function Form(props) {
  function addForm(newData) {
    props.changeForm([newData, ...props.form]);
  }
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div>
      {props.user.role !== "admin" ? (
        <></>
      ) : (
        <div>
          <Input addForm={addForm} />
        </div>
      )}
    </div>
  );
}
const mapStatetoprops = (state) => {
  return {
    form: state.form,
    user: state.user,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    changeForm: (form) => {
      dispatch({
        type: "changeForm",
        item: form,
      });
    },
    userLogin: (login, _id, username, role) => {
      dispatch({
        type: "login",
        payload: {
          login,
          _id,
          username,
          role,
        },
      });
    },
  };
};
export default connect(mapStatetoprops, mapDispatchtoProps)(Form);
