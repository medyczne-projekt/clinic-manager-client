import React, { useEffect, useState } from "react";
import "./ReceiptList.css";
import Cookies from "js-cookie";

class Receipt extends React.Component {
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
    return (
      <div className="result-item" style={{ backgorund: "green" }}>
        <div className="receipt-item-card">
        <div className="header-container">Kod recepty:</div>
          <div className="date-container">
            {this.props.receiptCode}
          </div>
          <div className="header-container">Data wystawienia:</div>
          
          <div className="date-container">
            {this.props.receiptPrescriptionDate}
          </div>
          <div className="header-container">Recepta ważna do:</div>
          <div className="date-container">{this.props.receiptValidTo}</div>
          {this.state.active === false ? (
            " "
          ) : (
            <>
              <div className="header-container">Wystawił:</div>
              <div className="date-container">{this.state.name}</div>
              <div className="header-container">Opis:</div>
              <hr />
              {this.props.receiptDescription.split(",").map((item, index) => (
                <p key={index}>
                  {item}
                  <hr />
                </p>
              ))}
            </>
          )}
          <div className="update-btn-container">
            <button
              onClick={() => {
                this.handleclick(this.props.receiptDoctorId);
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

export default function ReceiptList(props) {
  const [receiptList, setReceiptList] = useState([]);

  useEffect(() => {
    fetch(
      "https://umcs-clinic-manager.herokuapp.com/api/receipts/patient/" +
        Cookies.get("id") +
        "?=",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setReceiptList(data.sort((a, b) => a.receiptPrescriptionDate - b.receiptPrescriptionDate).reverse());
        console.log(data)
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
            <h1>Moje recepty</h1>
          </div>
          <div className="receipt-container">
            {receiptList.map((item, index) => (
              <Receipt
                receiptCode={item.receiptCode}
                receiptPrescriptionDate={item.receiptPrescriptionDate}
                receiptValidTo={item.receiptValidTo}
                receiptDescription={item.receiptDescription}
                receiptDoctorId={item.receiptDoctorId}
              ></Receipt>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
