import React from "react";
import SkyLight from "react-skylight";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Button, label } from "react-bootstrap";
import normal from "../icon/normal.png";
import like from "../icon/like.png";
import bin1 from "../icon/bin1.png";
import bin2 from "../icon/bin2.png";
import { server_api } from "../api/api";
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      binOutsrc: bin1,
      binInsrc: bin1,
    };

    this.binInMouseOver = this.binInMouseOver.bind(this);
    this.binInMouseOut = this.binInMouseOut.bind(this);
    this.binOutMouseOver = this.binOutMouseOver.bind(this);
    this.binOutMouseOut = this.binOutMouseOut.bind(this);
  }

  binInMouseOver() {
    this.setState({
      binInsrc: bin2,
    });
  }
  binOutMouseOver() {
    this.setState({
      binOutsrc: bin2,
    });
  }
  binInMouseOut() {
    this.setState({
      binInsrc: bin1,
    });
  }
  binOutMouseOut() {
    this.setState({
      binOutsrc: bin1,
    });
  }

  render() {
    return (
      <div>
        <div
          className="Post"
          style={{
            width: 510,
            height: 500,
            marginLeft: "12px",
            marginRight: "12px",
          }}
        >
          {this.props.user.login ? (
            <div>
              {!this.props.userList.includes(this.props.user._id) ? (
                <img
                  className="Post__delete"
                  style={{
                    width: "50px",
                    height: "50px",
                    float: "left",
                    bottom: 0,
                    position: "absolute",
                  }}
                  onClick={() => {
                    this.props.likePost(this.props.id);
                  }}
                  onMouseOver={(e) => {}}
                  src={normal}
                />
              ) : (
                <img
                  className="Post__delete"
                  style={{
                    width: "50px",
                    height: "50px",

                    float: "left",
                    bottom: 0,
                    position: "absolute",
                  }}
                  onClick={() => {
                    this.props.unlikePost(this.props.id);
                  }}
                  onMouseOver={(e) => {}}
                  src={like}
                />
              )}
            </div>
          ) : (
            <></>
          )}

          <div
            style={{
              position: "absolute",
              zIndex: "2",
              bottom: 0,
              marginLeft: "50px",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {this.props.score}
          </div>

          {this.props.user.role === "admin" ? (
            <img
              className="Post__delete"
              onClick={() => {
                if (window.confirm("Confirm to delete this post click OK")) {
                  this.props.deletePost(this.props.id, this.props.imgURL);
                }
              }}
              style={{
                fontSize: "10px",
                bottom: 0,
                right: 0,
                position: "absolute",
                width: "40px",
                height: "45px",
              }}
              onMouseOver={this.binOutMouseOver}
              onMouseOut={this.binOutMouseOut}
              src={this.state.binOutsrc}
            />
          ) : (
            <></>
          )}
          <div className="Post__title">
            {this.props.title}
            <img
              className="Post__image"
              src={`${server_api}/${this.props.imgURL}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.simpleDialog.show();
              }}
            />
          </div>
        </div>
        <SkyLight
          dialogStyles={{
            width: "80%",
            height: "90%",
            marginTop: "-335px",
            marginLeft: "-40%",
            backgroundColor: "#343a40",
            color: "#32A5B3",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          hideOnOverlayClicked
          ref={(ref) => (this.simpleDialog = ref)}
          title={
            <div>
              <Container style={{ alignItems: "flex-end" }}>
                <Row top="xs">
                  <Col>
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        maxWidth: "400px",
                        maxHeight: "400px",
                      }}
                      src={`${server_api}/${this.props.imgURL}`}
                    />
                  </Col>
                  <Col style={{ textAlign: "left" }}>
                    <label>ชื่อโพส: {this.props.name}</label>
                    <br />
                    <label>รายละเอียดเพิ่มเติม: {this.props.detail}</label>
                    <br />
                    <label>จำนวนคนสนใจ: {this.props.score} คน</label>
                    <br />
                    {this.props.user.role === "" ? (
                      <label
                        style={{
                          fontSize: "15px",
                          color: "white",
                        }}
                      >
                        กรุณาลงชื่อเข้าใช้เพื่อสามารถแสดงความสนใจต่อโพส
                      </label>
                    ) : (
                      <></>
                    )}
                    {this.props.user.role === "admin" ? (
                      <img
                        onClick={() =>
                          this.props.deletePost(
                            this.props.id,
                            this.props.imgURL
                          )
                        }
                        style={{
                          fontSize: "10px",
                          left: 0,
                          width: "40px",
                          height: "45px",
                          cursor: "pointer",
                        }}
                        onMouseOver={this.binInMouseOver}
                        onMouseOut={this.binInMouseOut}
                        src={this.state.binInsrc}
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Container>
            </div>
          }
        ></SkyLight>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    form: state.form,
  };
};

export default connect(mapStatetoProps)(Post);
