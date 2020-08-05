import React, { useState, useEffect, useRef } from "react";
import API from "../../utils/API";
import Validator from "validator";

function Login (props) {

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const  buttonRef = useRef();

    // manage button disabled state
    useEffect(() => {

        if (Validator.isEmail(state.email) && (state.password !== "")) {
        
            buttonRef.current.disabled = false
        
        } else {
        
            buttonRef.current.disabled = true
        
        }
    })
 
    function handleSubmit(event) {
        
        event.preventDefault()

        // login data are email and password
        const userData = { 
            "email": state.email,
            "password": state.password
         }

        // api call to sign in the user
        API.login(userData)
           .then(res => {
               console.log(props.history)
               if (res.data.status === "logged_in") {
                // run handleSuccessfulAuth which is given from props
                handleSuccessfulAuth(res.data)
               } 
            })
           .catch(err => {console.log(err.response)})
    }

    function handleChange(event) {
        // update email and password
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    // function which run handleLogin from App.js
  function handleSuccessfulAuth(data) {

    // run function from App.js which will set "global" state
    {props.handleLogin(data)}

    // use "history" from props from the parent and redirect to "/dashboard"
    console.log(props.history)
    {props.history.push("/stats")}

    //once this function completes, "/dashboard will be displayed and "global" state will be updated
  }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Enter your credentials</h3>

            <div className="form-group">
                <label>Email address</label>
                <input 
                    type="email" 
                    name="email" 
                    onChange={handleChange} 
                    className="form-control" 
                    placeholder="Enter e-mail" 
                    required
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    onChange={handleChange} 
                    className="form-control" 
                    placeholder="Enter password"  
                    maxLength="32"
                    required
                />                
            </div>

            <button type="submit" ref={buttonRef} className="btn btn-primary btn-block">Login</button>
        </form>
    );
}

export default Login;