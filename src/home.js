import "./App.css";
import React, { useState, useEffect } from "react";
import Post from "./components/Post";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Ring } from "react-awesome-spinners";
import { server_api } from "./api/api";
// import FacebookLogin from "react-facebook-login";
function Home(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // function addPost(title, imgURL) {
  //   const newPost = { id, title, imgURL };
  //   setPosts([newPost, ...posts]);
  //   id += 1;
  // }
  useEffect(() => {
    if (props.form.length === 0) {
      axios({
        url: `${server_api}/api/post/get`,
        method: "get",
        headers: {
          "Content-Type": "applicatoin/json",
        },
      }).then((result) => {
        setPosts(result.data.data);
        props.changeForm(result.data.data);
        setLoading(false);
      });
    } else {
      setPosts(props.form);
    }
  }, []);
  function likePost(ID) {
    axios({
      url: `${server_api}/api/post/like`,
      method: "post",
      data: {
        postID: ID,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    var update = [];
    posts.map((post) => {
      if (post._id === ID) {
        post.score += 1;
        post.userList.push(props.user._id);
      }
      update.push(post);
    });
    setPosts(update);
    props.changeForm(update);
  }
  function unlikePost(ID) {
    axios({
      url: `${server_api}/api/post/unlike`,
      method: "post",
      data: {
        postID: ID,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    var update = [];
    posts.map((post) => {
      {
        if (post._id === ID) {
          post.score -= 1;
          const listUpdate = post.userList.filter(
            (list) => list !== props.user._id
          );
          post.userList = listUpdate;
        }
        update.push(post);
      }
    });
    setPosts(update);
    props.changeForm(update);
  }
  function deletePost(id, imgURL) {
    axios({
      url: `${server_api}/api/post/delete`,
      method: "post",
      data: {
        _id: id,
        path: imgURL,
      },
    }).then((result) => {
      alert("ลบฟอร์มสำเร็จ");
    });
    const updatePost = posts.filter((post) => post._id !== id);
    setPosts(updatePost);
    props.changeForm(updatePost);
  }
  // const componentClicked = (data) => {
  //   console.log("data: ", data);
  // };
  // const responseFacebook = (response) => {
  //   console.log(response);
  // };
  return (
    <div
      className="head"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        top: 50,
      }}
    >
      <div className="Input__header">post</div>
      <div className="Form">
        {posts.length === 0 ? (
          loading && (
            <Ring style={{ size: 64, color: "#00bfff", sizeUnit: "px" }} />
          )
        ) : (
          <div>
            {/* <FacebookLogin
              appId="461858064845560"
              autoLoad={false}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
            /> */}
            <Container>
              <Row>
                {posts.map((post) => (
                  <Col key={post._id}>
                    <Post
                      key={post._id}
                      id={post._id}
                      name={post.name}
                      imgURL={post.image}
                      detail={post.detail}
                      score={post.score}
                      userList={post.userList}
                      deletePost={deletePost}
                      likePost={likePost}
                      unlikePost={unlikePost}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    form: state.form,
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
    likeForm: (ID, userID) => {
      dispatch({
        type: "like",
        payload: {
          id: ID,
          userID: userID,
        },
      });
    },
    userLogin: (login, _id, username, role, chatRecieverID, token) => {
      dispatch({
        type: "login",
        payload: {
          login,
          _id,
          username,
          role,
          chatRecieverID,
          token,
        },
      });
    },
  };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(Home);
