import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

class Visit extends React.Component {
  state = { name: "", active: false, buttonName: "szczegóły" };
  handleclick = (idOfPatient) => {
    if (this.state.active === false) {
      fetch(
        "https://umcs-clinic-manager.herokuapp.com/api/user/" + idOfPatient,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(
            data.user_userDetails.user_firstName +
              " " +
              data.user_userDetails.user_lastName
          );

          this.setState({
            name:
              data.user_userDetails.user_firstName +
              " " +
              data.user_userDetails.user_lastName,
            active: true,
            buttonName: "ukryj",
          });
        });
    } else {
      this.setState({
        active: false,
        buttonName: "szczegóły",
      });
    }
  };

  render() {
    const date = this.props.startDate.split("T");
    return (
      <div className="result-item" style={{ backgorund: "green" }}>
        <div className="visit-item-card">
          <div className="header-container">Data wizyty:</div>
          <div className="date-container">{date[0]}</div>
          <div className="header-container">Godzina wizyty:</div>
          <div className="date-container">{date[1]}</div>
          {this.state.active === false ? (
            " "
          ) : (
            <>
              <div className="header-container">Pacjent:</div>
              <div className="date-container">{this.state.name}</div>
              <div className="header-container">
                Opis:<p>{this.props.visitDescription}</p>
              </div>
              <hr />
            </>
          )}
          <div className="update-btn-container">
            <button
              onClick={() => {
                this.handleclick(this.props.idOfPatient);
              }}
            >
              {this.state.buttonName}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function VisitDoctorList() {
  const [visitsList, setVisitsList] = useState([]);

  useEffect(() => {
    fetch(
      "https://umcs-clinic-manager.herokuapp.com/api/visit/doctor/" +
        Cookies.get("id"),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setVisitsList(data);
        console.log(data);
      })
      .catch((err) => {
        window.location.reload()
      });
  }, []);

  return (
    <>
      <div className="receiptList-main-container">
        <div style={{ width: "240px" }}></div>
        <div style={{ width: "100%" }}>
          <div className="header-container">
            <h1>Harmonogram wizyt</h1>
          </div>
          <div className="receipt-container">
            {console.log(visitsList)}
            {visitsList.map((item, index) => (
              <Visit
                startDate={item.startDate}
                receiptValidTo={item.receiptValidTo}
                receiptDescription={item.receiptDescription}
                receiptDoctorId={item.receiptDoctorId}
                idOfPatient={item.idOfPatient}
                visitDescription={item.visitDescription}
              ></Visit>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitDoctorList;
