import React, { useState, useEffect }  from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import API from "./utils/API";

// pages
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage";
import AddTrailPage from "./pages/AddTrailPage";
import FindTrailPage from "./pages/FindTrailPage";
import GalleryPage from "./pages/GalleryPage";
import StatsPage from "./pages/StatsPage";
import PublicPage from "./pages/PublicPage";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App(props) {

  
  // global state which is pushed via render props
  const [state, setState] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}  
  })

  // helper function which is pushed via render props
  function handleLogin(data) {
    setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  // helper function which is pushed via render props
  function handleLogout({...props}) {
    setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })   
    console.log(props)
    props.history.push("/")
  }

  // helper to check if user is logged in
  // here we know this:
  // IF USER is logged in, passport.js will add user user object to EVERY request
  // in express.js as this is middleware function
  function checkLoginStatus() {
    API.checklogin()
      .then(res => {
        // when passport replies with user we are logged_in
        if (res.data.user) {
          setState({
            loggedInStatus: "LOGGED_IN",
            user: res.user
          })
        } else {
          setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          })
        }
      })        
      .catch(err => {console.log("Error:",err)})
  }

  
  // check login status
  useEffect(() => {
 
    checkLoginStatus()
  }, []) // <= [] means it will run ONCE, when component is mounted
  
 
  return (
    <div>
        <Router>
          <div>
            <Switch>

                      <Route 
                        exact 
                        path="/" 
                        render={props => ( 
                            
                            <HomePage 
                                {...props}  
                            />
                        )}          
                      />

                      <Route 
                        exact 
                        path="/login" 
                        render={props => ( 
                          <div>
                            <Header status={state.loggedInStatus}/>
                            <Navbar {...props} handleLogout={handleLogout} /> 
                            <LoginPage 
                                {...props}  
                                goto="login" 
                                handleLogin={handleLogin} 
                                loggedInStatus={state.loggedInStatus} 
                            />
                            <Footer/>
                            </div>
                        )}          
                      />   

                      <Route 
                        exact 
                        path="/register" 
                        render={props => ( 
                          <div>
                            <Header status={state.loggedInStatus}/>
                            <Navbar {...props} handleLogout={handleLogout} /> 
                            <LoginPage 
                                {...props}  
                                goto="register" 
                                handleLogin={handleLogin} 
                                handleLogout={handleLogout} 
                                loggedInStatus={state.loggedInStatus} 
                            />
                            <Footer/>
                          </div>
                        )}          
                      />   

                      <Route 
                          exact 
                          path="/addtrail" 
                          render={props => ( 
                            <div>
                              <Header status={state.loggedInStatus}/>
                              <Navbar {...props} handleLogout={handleLogout} /> 
                              <AddTrailPage 
                                  {...props}  
                                  loggedInStatus={state.loggedInStatus}
                                  user={state.user} 
                              />
                              <Footer/>
                              </div>
                          )}          
                      />    

                      <Route 
                          exact 
                          path="/findtrail" 
                          render={props => (
                            <div>
                              <Header status={state.loggedInStatus}/>
                              <Navbar {...props} handleLogout={handleLogout} />  
                              <FindTrailPage 
                                  {...props}  
                                  loggedInStatus={state.loggedInStatus} 
                                  user={state.user} 
                              />
                              <Footer/>
                              </div>
                          )}          
                      /> 

                      <Route 
                          exact 
                          path="/gallery" 
                          render={props => (
                            <div>
                              <Header status={state.loggedInStatus}/>
                              <Navbar {...props} handleLogout={handleLogout} />  
                              <GalleryPage 
                                  {...props}  
                                  loggedInStatus={state.loggedInStatus} 
                                  user={state.user} 
                              />
                              <Footer/>
                              </div>
                          )}          
                      />  

                      <Route 
                          exact 
                          path="/public" 
                          render={props => (
                            <div>
                              <Header status={state.loggedInStatus}/> 
                              <Navbar {...props} handleLogout={handleLogout} /> 
                              <PublicPage 
                                  {...props}  
                                  loggedInStatus={state.loggedInStatus} 
                                  user={state.user} 
                              />
                              <Footer/>
                              </div>
                          )}          
                      />  

                      <Route 
                          exact 
                          path="/stats" 
                          render={props => (
                            <div>
                              <Header status={state.loggedInStatus}/>
                              <Navbar {...props} handleLogout={handleLogout} />  
                              <StatsPage 
                                  {...props}  
                                  loggedInStatus={state.loggedInStatus} 
                                  user={state.user} 
                              />
                              <Footer/>
                              </div>
                          )}          
                      />   

                      <Route 
                          component={NoMatch}        
                      /> 

              </Switch>
          </div>           
        </Router>   
    </div>     
  );
}

export default App;
