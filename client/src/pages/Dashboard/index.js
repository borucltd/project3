import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import API from "../../utils/API";



// static components
import Header from "../../components/Header";
// import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// pages
import LoginPage from "../LoginPage"
import HomePage from "../HomePage";
import NoMatch from "../NoMatch";


function Dashboard(props)  {

  // if we need more menu items just add them here
  const [state,setState] = useState([
    {
      link: "login",
      text: "🏃\uFE0E LOGIN",
      onClick: handleLogoutOnClick
    },
    {
      link: "addtrail",
      text: "🔎\uFE0E ADD TRAIL",
      onClick: handleLogoutOnClick   
    },
    {
      link: "findtrail",
      text: "🔎\uFE0E FIND TRAIL",
      onClick: handleLogoutOnClick
    },
    {
      link: "gallerytrail",
      text: "📷\uFE0E GALLERY",
      onClick: handleLogoutOnClick
    },
    {
      link: "login",
      text: "🚪\uFE0E LOGOUT",
      onClick: handleLogoutOnClick
    }
  ]);

  // log out function
  function handleLogoutOnClick(){
    API.logout()
      .then(res => props.handleLogout())
      .catch(err => console.log(err))
    props.history.push("/login")
  }

  // function which run handleLogin from App.js
  function handleSuccessfulAuth(data) {

    // run function from App.js which will set "global" state
    props.handleLogin(data)

    // use "history" from props from the parent and redirect to "/dashboard"
    props.history.push("/dashboard")

    //once this function completes, "/dashboard will be displayed and "global" state will be updated
  }

  function checkLoginStatus() {
    API.checklogin()
      .then(res => {
        // when passport replies with user we are logged_in
        console.log(res)
        if (res.data.user) {
          setState({
            loggedInStatus: "LOGGED IN",
            user: res.user
          })
        }
      })        
      .catch(err => {console.log("AAAAA",err)})
  }


  // helper function which is pushed via render props
  function handleLogout(data) {
    setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }
  // check login status
  useEffect(() => {
    checkLoginStatus()
  }, []) // <= [] means it will run ONCE, when component is mounted

  return (
    <Router>
              
        <Header/>
        
        <nav className="navbar-nav mx-auto mt-2 navbar-expand-md mr-auto">  
            <div className="navbar-toggler mx-auto" style={{height: "2.3em"}} data-toggle="collapse" data-target="#contentMenu" aria-controls="contentMenu" aria-expanded="true" aria-label="hamburger">
                <span><i className="fa fa-bars gradient-text bottomfa" id="bars"></i></span>
            </div>
        
            <div className="collapse navbar-collapse mynav" id="contentMenu">
                <ul className="navbar-nav mr-auto nav-fill w-100">
                {state.map((item,index) => (
                    <li className="nav-item mx-0">
                    <Link to={item.link} className="nav-link active" onClick={item.onClick}>{item.text}</Link>
                    </li>
                ))}
                </ul>
            </div>
        </nav>  

            
                <Switch>    

                    <Route 
                        exact 
                        path="/login" 
                        render={props => ( 
                            <LoginPage 
                                {...props}  
                                goto="login" 
                                handleLogin={props.handleLogin} 
                                handleLogout={props.handleLogout} 
                                loggedInStatus={state.loggedInStatus} 
                            />
                        )}          
                    />                       

                </Switch>
           
        <Footer/>    
        </Router>
  );
};

export default Dashboard;





