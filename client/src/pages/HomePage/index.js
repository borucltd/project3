import React from "react";
import { Link } from 'react-router-dom';
import "./style.css";
import { set } from "date-fns";


function HomePage({...props})  {
  return (
    <div className="container">

      <div className="row my-auto">
        <div className="col-md-8 mx-auto my-auto" >
            <img src="./images/landing-pic.svg" width="100%"/>
        </div>
      </div>

      <div className="row my-auto">
          <div className="col-md-8 mx-auto mt-4">
          <Link key={0} to="/login" className="nav-link active block" >LOG IN / SIGN UP</Link>
          </div>
      </div>


      <div className="row my-auto">
          <div className="col-md-8 mx-auto mt-4">
          <Link key={0} to="/public" className="nav-link active block" >See where others have been!P</Link>
          </div>
      </div>            
    </div>
  );
};

export default HomePage;
