import React from "react";
import API from "../../utils/API";


function Dashboard(props)  {

  // log out function
  function handleLogoutOnClick(){
    API.logout()
      .then(res => props.handleLogout())
      .catch(err => console.log(err))
      props.history.push("/login")
  }
  console.log(props)
  return (
      <div className="container">
        <div className="jumbotron logo-background">
          <h1>Dashboard</h1>   
          <ul>
              <li>Status {props.loggedInStatus}</li>
              <li>Logo</li>
              <li>Add actvity</li>
              <li>View activities</li>
              <li>View others activities</li>
             
              <button onClick={handleLogoutOnClick}>Logout</button>
          </ul>   
          <h2>Components will be rendered inside this main component</h2>
        </div>
      </div>
  );
};

export default Dashboard;
