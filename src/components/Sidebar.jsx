import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Cookies from "js-cookie";
export default function Sidebar(props) {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-container">
          <div>
            <ul className="sidebar-items-container">
              <div className="sidebar-link">ZALOGOWANO JAKO:</div>
              <div className="sidebar-link" style={{ fontSize: 50 }}>
                {props.userName.toUpperCase()}
              </div>
              {Cookies.get("user") === "PATIENT" ? (
                <>
                  <li className="sidebar-item">
                    <Link to="/MakeVisit" className="sidebar-link">
                      <i className="fa fa-plus" aria-hidden="true" />{" "}
                      <p>Umów wizytę</p>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/ReceiptList" className="sidebar-link">
                      <i className="fas fa-pills" /> <p>Moje recepty</p>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/VisitsList" className="sidebar-link">
                      <i className="fas fa-clipboard-list" /> <p>Moje wizyty</p>
                    </Link>
                  </li>
                </>
              ) : (
                  <>
                <li className="sidebar-item">
                  <Link to="/VisitDoctorList" className="sidebar-link">
                    <i className="fas fa-clipboard-list" />{" "}
                    <p>Harmonogram wizyt</p>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/AddReceipt" className="sidebar-link">
                    <i className="fa fa-plus" />{" "}
                    <p>Wypisz recepte</p>
                  </Link>
                </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
