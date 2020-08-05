import React from "react";


function HomePage(props)  {

  
  return (
      <div className="container">
        <div className="jumbotron logo-background">
          <h1>Home Page</h1>   
          <ul>
              <li>Welcome: {props.user}</li>
              <li>You are: {props.loggedInStatus}</li>
              <li>Avatar</li>
              <li>View others activities</li>
              <li>Logout</li> 
          </ul>   
          <h2>Please login to start managing your trail activities,</h2>
        </div>
      </div>
  );
};

export default HomePage;
