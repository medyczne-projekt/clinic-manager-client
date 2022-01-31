import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./SignIn.css";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import jwt from "jwt-decode";

function Register(props) {
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
        if (Cookies.get("user") === "DOCTOR") {
          history.push("/VisitDoctorList");
        } else {
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
          <center>Rejestracja </center>
        </h1>

        <div className="gridRow">
          <div className="Register">
            <label>
              <h2>Nazwa użytkownika</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="username"
              onChange={(e) => {}}
            />
          </div>
          <div className="Register">
            <label>
              <h2>Email</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="email"
              onChange={(e) => {}}
            />
          </div>
        </div>

        <div className="gridRow">
          <div className="Register">
            <label>
              <h2>Imię</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="firstname"
              onChange={(e) => {}}
            />
          </div>
          <div className="Register">
            <label>
              <h2>Nazwisko</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="lastname"
              onChange={(e) => {}}
            />
          </div>
        </div>

        <div className="gridRow">
          <div className="Register">
            <label>
              <h2>Kraj</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="country"
              onChange={(e) => {}}
            />
          </div>
          <div className="Register">
            <label>
              <h2>Płeć</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="sex"
              onChange={(e) => {}}
            />
          </div>
        </div>

        <div className="gridRow">
          <div className="Register">
            <label>
              <h2>Data urodzenia</h2>
            </label>
            <input
              variant="outlined"
              fullWidth={true}
              type="date"
              onChange={(e) => {}}
            />
          </div>
          <div className="Register">
            <label>
              <h2>Kod pocztowy</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="postalcode"
              onChange={(e) => {}}
            />
          </div>
        </div>

        <div className="gridRow">
          <div className="Register">
            <label>
              <h2>Miasto</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="city"
              onChange={(e) => {}}
            />
          </div>
          <div className="Register">
            <label>
              <h2>Ulica</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="street"
              onChange={(e) => {}}
            />
          </div>
        </div>

        <div className="gridRow">
          <div className="Register">
            <label>
              <h2>Hasło</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="password"
              onChange={(e) => {}}
            />
          </div>
          <div className="Register">
            <label>
              <h2>Powtórz hasło</h2>
            </label>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="password"
              onChange={(e) => {}}
            />
          </div>
        </div>

        <br></br>
        <p></p>
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
            ZAREJESTRUJ SIĘ
          </Button>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Register);
