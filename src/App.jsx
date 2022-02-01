import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ReceiptList from "./pages/ReceiptList";
import MakeVisit from "./pages/MakeVisit";
import VisitsList from "./pages/VisitsList";
import SignIn from "./pages/SignIn";
import VisitDoctorList from "./pages/VisitDoctorList";
import AddReceipt from "./pages/AddReceipt";
import Register from "./pages/Register";
import ProtectedPatientRoute from "./components/ProtectedPatientRoute";
import ProtectedDoctorRoute from "./components/ProtectedDoctorRoute";



class App extends React.Component {

  constructor(props) {
    super(props);  
    this.initialState = { userName: "", token: ""}        
    this.state = JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state'))
    : this.initialState

    const orginial = this.setState;     
    this.setState = function() {
        let arguments0 = arguments[0];
        let arguments1 = () => (localStorage.setItem('state', JSON.stringify(this.state)));
        orginial.bind(this)(arguments0, arguments1);
    }
  }

  setUserName = (newName) =>{
    this.setState({userName: newName})
  }

  render() { 
    return (
      <>
        <div className="App">
          <Router>
            <Header/>
            <div className="inner-content">
              <Sidebar userName={this.state.userName === null ? "" : this.state.userName }/>
              <Switch>
                <Route path="/" exact component={() => <SignIn setUserName={this.setUserName}> </SignIn> } />
                <Route path="/Register" exact component={() => <Register > </Register> } />
                <ProtectedPatientRoute
                  path="/ReceiptList"
                  exact
                  component={() => <ReceiptList token={this.state.token}></ReceiptList>}
                />
                <ProtectedPatientRoute
                  path="/MakeVisit"
                  exact
                  component={MakeVisit}
                />
                <ProtectedPatientRoute
                  path="/VisitsList"
                  exact
                  component={VisitsList}
                />
                <ProtectedDoctorRoute
                  path="/VisitDoctorList"
                  exact
                  component={VisitDoctorList}
                />
                <ProtectedDoctorRoute
                  path="/AddReceipt"
                  exact
                  component={AddReceipt}
                />
                <Route
                  path="*"
                  component={() => "404 NOT FOUND. TRY A EXISTING  ADDRESS"}
                />

              </Switch>
            </div>
          </Router>
        </div>
      </>
    );
  }
}
export default App;
