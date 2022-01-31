import "./VisitsList.css";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

class Visit extends React.Component {
  state = { name: "", active: false, buttonName: "szczegóły" };
  handleclick = (doctorsId) => {
    if (this.state.active === false) {
      fetch("https://umcs-clinic-manager.herokuapp.com/api/user/" + doctorsId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
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
              <div className="header-container">Lekarz:</div>
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
                this.handleclick(this.props.idOfDoctor);
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

export default function VisitsList() {
  const [visitsList, setVisitsList] = useState([]);

  useEffect(() => {
    fetch(
      "https://umcs-clinic-manager.herokuapp.com/api/visit/patient/" +
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
        setVisitsList(data.sort((a, b) => a.startDate - b.startDate).reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="receiptList-main-container">
        <div style={{ width: "240px" }}></div>
        <div style={{ width: "100%" }}>
          <div className="header-container">
            <h1>Moje wizyty</h1>
          </div>
          <div className="receipt-conteiner">
            {visitsList.map((item, index) => (
              <Visit
                startDate={item.startDate}
                idOfDoctor={item.idOfDoctor}
                visitDescription={item.visitDescription}
              ></Visit>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
