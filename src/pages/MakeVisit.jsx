import "./AddPatient.css";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function MakeVisit(props) {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setdoctorId] = useState("");
  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState([]);
  const [day, setDay] = useState();
  const [text, setText] = useState();
  const [loginStatus, setLoginStatus] = useState(2);

  useEffect(() => {
    fetch("https://umcs-clinic-manager.herokuapp.com/api/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data.filter((doktor) => doktor.user_role === "DOCTOR"));
        console.log(doctors);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClick = () => {
    fetch("https://umcs-clinic-manager.herokuapp.com/api/visit/add?=", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify({startDate: day + "T" + hour,
      endDate: day + "T" + hour,
      visitDescription: text,
      idOfPatient: Cookies.get("id"),
      idOfDoctor: doctorId
    })
        
    })
    .then((response) => response.json())
    .then((data) => {if (data.error){
      setLoginStatus(0);}
      else setLoginStatus(1)
      })
    .catch((err) => {

      });
  };

  const hoursTMP = [];
  return (
    <>
      <div className="receiptList-main-container">
        <div style={{ width: "240px" }}></div>
        <div style={{ width: "100%" }}>
          <div className="AddPatient">
            <div className="main-container">
              <div className="header-container">
                <h1>UMÓW WIZYTĘ</h1>
              </div>
              <div>
                <div>
                  <div className="form-item">
                    <label>Wybierz lekarza</label>
                    <select
                      onChange={(e) => {
                        setdoctorId(e.target.value);
                        for (let i = 8; i <= 18; i++) {
                          hoursTMP.push(i + ":00");
                          hoursTMP.push(i + ":30");
                        }
                        setHours(hoursTMP);
                      }}
                    >
                      <option value="none" selected disabled hidden>
                        wybierz
                      </option>
                      {doctors.map((item) => (
                        <option value={item.user_id}>
                          {item.user_userDetails.user_firstName +
                            " " +
                            item.user_userDetails.user_lastName +
                            " "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid-row">
                    <div className="form-item">
                      <label>Wybierz dzień</label>
                      <input
                        type="date"
                        min = {new Date(Date.now()).toISOString().slice(0, 10)}
                        onChange={(e) => {
                          setDay(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-item">
                      <label>Wybierz godzine</label>
                      <select
                        onChange={(e) => {
                          setHour(e.target.value);
                        }}
                      >
                        <option value="none" selected disabled hidden>
                          wybierz
                        </option>
                        {hours.map((item) => (
                          <option value={item}> {item}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-item">
                  <label>Opisz dolegliwości</label>
                  <input
                    type="text"
                    placeholder="oj jak boli"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="btn-container">
                <button
                  onClick={handleClick}
                >
                  Umów
                </button>
              </div>
              {(loginStatus === 1) ? <center style={{color:"green"}}>Umówiono wizytę</center> : (loginStatus === 0) ? <center style={{color:"red"}}>Nie udało się umówić wizyty</center> : "" }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
