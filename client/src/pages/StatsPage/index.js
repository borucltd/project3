import React, { useEffect } from "react";
import { Link } from "react-router-dom";


function StatsPage(props) {
 
  const isLoggedIn = props.loggedInStatus === "LOGGED_IN" ? true : false;

  return (
    <div  className="container mb-5 mt-5">
      {!isLoggedIn
        ? <h1 className="text-center">Please login first!!!</h1>
        : <div>

          <div>
                <h1 className="text-center">View your stats !!!</h1>                
          </div>
          </div>
      }
    </div>
  );
};

export default StatsPage;
