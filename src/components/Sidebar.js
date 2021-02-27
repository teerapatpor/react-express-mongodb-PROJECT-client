import React, { useEffect } from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  userMapStatetoProps,
  userMapDispatchtoProps,
} from "../states/userState";
import { connect } from "react-redux";
function Sidebar(props) {
  useEffect(() => {
    console.log(props.user.role);
  }, []);
  return (
    <div className="Sidebar">
      {props.user.role !== "admin" ? (
        <div>
          {SidebarData.filter((item) => item.title !== "เพิ่มฟอร์ม").map(
            (item, index) => {
              return (
                <Link to={item.path} key={index}>
                  <Button
                    variant="outline-info"
                    style={{
                      borderRadius: "0px",
                      width: "100%",
                      borderColor: "white",
                    }}
                  >
                    <span>{item.title}</span>
                  </Button>
                </Link>
              );
            }
          )}
        </div>
      ) : (
        <div>
          {SidebarData.map((item, index) => {
            return (
              <Link to={item.path} key={index}>
                <Button
                  variant="outline-info"
                  style={{
                    borderRadius: "0px",
                    width: "100%",
                    borderColor: "white",
                  }}
                >
                  <span>{item.title}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default connect(userMapStatetoProps, userMapDispatchtoProps)(Sidebar);
