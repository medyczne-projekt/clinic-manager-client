import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./SignIn.css";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import { Link } from "react-router-dom";

function SignIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const { history } = props;

  const Login = () => {
    const params = new URLSearchParams({
      username: username,
      password: password,
    });
    fetch("https://umcs-clinic-manager.herokuapp.com/api/login?=", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        const user = jwt(data.access_token);
        Cookies.set("user", user.roles[0]);
        console.log(Cookies.get("user"));
        console.log(data.access_token);
        if (Cookies.get("user") === "DOCTOR"){
          history.push("/VisitDoctorList");
        }
        else {
          history.push("/MakeVisit");
        }
        
        Cookies.set("token", data.access_token);
        props.setUserName(username);
        console.log(user);
        Cookies.set("id", user.userId);
      })
      .catch((err) => {
        console.error(err);
        setLoginStatus("ups coś poszło nie tak");
      });
  };

  return (
    <div className="SignIn">
      <div className="items">
        <h1 className="headerlogin">
          <center>TRZEŚNIAK'S CLINIC</center>
        </h1>

        <div className="username">
          <label>
            <h2>NAZWA UŻYTKOWNIKA</h2>
          </label>
          <TextField
            variant="outlined"
            fullWidth={true}
            placeholder="username"
            type="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <p> </p>
        <div className="password">
          <label>
            <h2>HASŁO </h2>
          </label>
          <TextField
            variant="outlined"
            fullWidth={true}
            placeholder="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <br></br>

        <div className="loginbtn">
          <Button
            variant="contained"
            size="large"
            color="primary"
            id="submit"
            onClick={() => {
              Login();
            }}
          >
            ZALOGUJ SIĘ
          </Button>
        </div>
        <Link to="/Register">
            <h4>zarejestruj się</h4>
        </Link>
        

        <h3 className="loginstatus"> {loginStatus} </h3>
      </div>
    </div>
  );
}
export default withRouter(SignIn);
