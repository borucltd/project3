import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import API from "../../utils/API";

import Login from "../../components/Login";
import SignUp from "../../components/SignUp";


function LoginPage ({...props}) {
        

  let requiredComponent;
  if (props.goto === "register") {
    requiredComponent = <SignUp {...props} handleSuccessfulAuth={props.handleSuccessfulAuth} />;
    } else {
    requiredComponent = <Login {...props} handleSuccessfulAuth={props.handleSuccessfulAuth} />;
  }

  return (
        
        <div className="container flex flex-vertical mb-5 mt-5">
          <div className="header-div mx-auto text-center align-items-end">
              <div className="col-sm-12 text-center">
                <Link to="/login" ><button id="btnLeft" className="btn btn-primary btn-lg center-block" style={{width: "50%" }} >Login</button></Link>
                <Link to="/register"><button id="btnRight" className="btn btn-danger btn-lg center-block" style={{width: "50%" }}>Sign up</button></Link>
              </div>
          </div>
          
          {requiredComponent}
              
        </div>
    );
}

export default LoginPage;
