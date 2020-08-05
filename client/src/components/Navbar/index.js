import React, { useState } from "react";
import { Link } from 'react-router-dom';
import API from "../../utils/API";


function Navbar(props) {
 
  // if we need more menu items just add them here
  const [state,setState] = useState([
    {
      link: "/login",
      text: "🏃\uFE0E LOGIN/REGISTER",
      onClick: nothing
    },
    {
      link: "/addtrail",
      text: "🔎\uFE0E ADD TRAIL",
      onClick: nothing   
    },
    {
      link: "/findtrail",
      text: "🔎\uFE0E VIEW YOUR TRAILS",
      onClick: nothing
    },
    {
      link: "/gallery",
      text: "📷\uFE0E GALLERY",
      onClick: nothing
    },
    {
      link: "/stats",
      text: "📷\uFE0E STATS",
      onClick: nothing
    },
    {
      link: "/public",
      text: "📷\uFE0E PUBLIC",
      onClick: nothing
    },
    {
      link: "/",
      text: "🚪\uFE0E LOGOUT",
      onClick: handleLogoutOnClick
    }
  ]);

  function nothing() {
    console.log("navbar: empty onclick")
  }
   
  // logout function
  function handleLogoutOnClick(event){
    event.preventDefault()
    console.log("LOG OUT")

    API.logout()
      .then(res => {
        console.log(res)
        {props.handleLogout(props)}
        
      })
      .catch(err => console.log(err))    
}

  return (
    <nav className="navbar-nav mx-auto mt-2 navbar-expand-md mr-auto">  
        <div className="navbar-toggler mx-auto" style={{height: "2.3em"}} data-toggle="collapse" data-target="#contentMenu" aria-controls="contentMenu" aria-expanded="true" aria-label="hamburger">
            <span><i className="fa fa-bars gradient-text bottomfa" id="bars"></i></span>
        </div>
    
        <div className="collapse navbar-collapse mynav" id="contentMenu">
            <ul className="navbar-nav mr-auto nav-fill w-100">
              {state.map((item,index) => {
                             
                    if (item.link === "/") {
                      return (
                        <li key={index} className="nav-item mx-0">
                           <a href="/" ><span className="nav-link active" onClick={item.onClick}>{item.text}</span></a>
                        </li>
                      ) 
                     } else {
                      
                      return (
                        <li key={index} className="nav-item mx-0">
                           <Link key={index} to={item.link} className="nav-link active" onClick={item.onClick}>{item.text}</Link>
                        </li>
                        )
                     }
                  
                  
                 
              })}
            </ul>
        </div>
  </nav>    
  );
}

export default Navbar;
