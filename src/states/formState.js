const formMapStatetoProps = (state) => {
  return {
    form: state.form,
  };
};
const formMapDispatchtoProps = (dispatch) => {
  return {
    changeForm: (form) => {
      dispatch({
        type: "changeForm",
        item: form,
      });
    },
  };
};

export { formMapStatetoProps, formMapDispatchtoProps };
