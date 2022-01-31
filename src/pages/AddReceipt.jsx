import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function AddReceipt() {
  const [patients, setPatients] = useState([]);
  const [patientId, setPatienId] = useState("");
  const [day, setDay] = useState();
  const [text, setText] = useState();
  const [formStatus, setFormstatus] = useState(2);
  useEffect(() => {
    fetch("https://umcs-clinic-manager.herokuapp.com/api/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPatients(data.filter((patient) => patient.user_role === "PATIENT"));
        console.log(patients);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClick = () => {
    if (day && patientId && text) {
      console.log(day);
      console.log(patientId);
      console.log(text);
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
     
        fetch("https://umcs-clinic-manager.herokuapp.com/api/receipt/add?=", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
          body: JSON.stringify({
            receiptDescription: text ,
            receiptPrescriptionDate: today.toISOString().slice(0, 10) ,
            receiptValidTo: day,
            receiptPatientId: patientId,
            receiptDoctorId: Cookies.get("id")
          }),
        })
          .then((response) => {
            console.log(response.json())
          })
          .then((data) => {
            console.log(data)
          })
          .catch((err) => {});
         

      setFormstatus(1);
    } else setFormstatus(0);
  };

  return (
    <>
      <div className="receiptList-main-container">
        <div style={{ width: "240px" }}></div>
        <div style={{ width: "100%" }}>
          <div className="AddPatient">
            <div className="main-container">
              <div className="header-container">
                <h1>WYPISZ RECEPTĘ</h1>
              </div>
              <div>
                <div>
                  <div className="form-item">
                    <label>Wybierz pacjenta</label>
                    <select
                      onChange={(e) => {
                        setPatienId(e.target.value);
                      }}
                    >
                      <option value="none" selected disabled hidden>
                        wybierz
                      </option>
                      {patients.map((item) => (
                        <option value={item.user_id}>
                          {item.user_userDetails.user_firstName +
                            " " +
                            item.user_userDetails.user_lastName +
                            " "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-item">
                    <label>Podaj date ważności recepty</label>
                    <input
                      type="date"
                       min = {new Date(Date.now()).toISOString().slice(0, 10)}
                      onChange={(e) => {
                        setDay(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="form-item">
                  <label>Wpisz leki</label>

                  <textarea
                    id="text"
                    name="text"
                    rows="30"
                    cols="20"
                    type="text"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="btn-container">
                <button onClick={handleClick}>Wypisz</button>
              </div>
            </div>
          </div>
         {(formStatus === 1) ? <center style={{color:"green"}}>Wypisano receptę</center> : (formStatus === 0) ? <center style={{color:"red"}}>Musisz wypełnić wszystkie pola</center> : "" }
        </div>
      </div>
    </>
  );
}
