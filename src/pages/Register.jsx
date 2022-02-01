import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./SignIn.css";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import { set } from "js-cookie";
import { Link } from "react-router-dom";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [sex, setSex] = useState("");
  const [date, setDate] = useState("");

  const [postalcode, setPostalcode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(true);
 
  const [registerStatus, setRegisterStatus] = useState();
  const reg = () => {
    if (password !== password2)
    {
      setPasswordStatus(false);
    }else
    {
      setPasswordStatus(true);      
      fetch("https://umcs-clinic-manager.herokuapp.com/api/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_username: username ,
          user_password: password,
          user_role: "PATIENT",
          user_userDetails: {
            user_firstName: firstname,
            user_lastName: lastname,
            user_gender: sex,
            user_email: email,
            user_country: country,
            user_city: city,
            user_street: street,
            user_postal_code: postalcode,
            user_dateOfBirth: date + "T00:00:00Z"
          }
        }),
      })
        .then((response) => {
          console.log(response.json())
        })
        .then((data) => {
          console.log(data)
          history.push("/");
        })
        .catch((err) => {});
    }
  }

  const { history } = props;

  return ( 
    <div className="SignIn">
      <div className="items">
        <h1 className="headerlogin">
          <center>Rejestracja</center>
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
              onChange={(e) => {setUsername(e.target.value)}}
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
              onChange={(e) => {setEmail(e.target.value)}}
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
              onChange={(e) => {setFirstname(e.target.value)}}
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
              onChange={(e) => {setLastname(e.target.value)}}
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
              onChange={(e) => {setCountry(e.target.value)}}
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
              onChange={(e) => {setSex(e.target.value)}}
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
              onChange={(e) => {setDate(e.target.value)}}
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
              onChange={(e) => {setPostalcode(e.target.value)}}
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
              onChange={(e) => {setCity(e.target.value)}}
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
              onChange={(e) => {setStreet(e.target.value)}}
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
              onChange={(e) => {setPassword(e.target.value)}}
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
              onChange={(e) => {setPassword2(e.target.value)}}
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
            onClick={() => reg()}
          >
            ZAREJESTRUJ SIĘ
          </Button>
        </div>
        <Link to="/">
            <h4>WRÓĆ DO LOGOWANIA</h4>
        </Link>

        {(!passwordStatus) ? <center style={{color:"red"}}>Hasła nie są identyczne</center> : "" }
      </div>
    </div>
  );
}
export default withRouter(Register);
