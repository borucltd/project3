import React, {useState, useEffect, useRef} from "react";
import API from "../../utils/API";
import Validator from "validator";
import passwordValidator from "password-validator";

function SignUp (props) {
    
    // Password policy
    const passwordSchema =  new passwordValidator();
    passwordSchema
        .is().min(8)
        .is().max(32)
        .has().uppercase() 
        .has().lowercase() 
        .has().digits()                                
        .has().not().spaces()
        
    const [password_errors, setPasswordErrors] = useState([]) 

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        registration_errors: ""
    });

    // to manage DOM
    const nameRef       = useRef();
    const emailRef      = useRef();
    const passwordRef   = useRef();
    const passwordVRef  = useRef();
    const buttonRef     = useRef();

    useEffect(() => {
       
        // check if name is provided
        if (state.name == 0) {
            nameRef.current.style.backgroundColor = "orange";
        } else {
            nameRef.current.style.backgroundColor = "#ADFF2F";
        }

        // check if valid email is provided
        if (!Validator.isEmail(state.email)) {
            emailRef.current.style.backgroundColor = "orange";
        } else {
            emailRef.current.style.backgroundColor = "#ADFF2F";
        }

        // check if valid password is provided
        if(!passwordSchema.validate(state.password)) {
            passwordRef.current.style.backgroundColor =  "orange";
        } else {
            passwordRef.current.style.backgroundColor = "#ADFF2F";
        }

        // check if verification password == password
        if (state.password_confirmation === state.password) {
            passwordVRef.current.style.backgroundColor =  "#ADFF2F";
        } else {
            passwordVRef.current.style.backgroundColor = "orange";
        }

        // manage disable == enable button
        if (Validator.isEmail(state.email) && passwordSchema.validate(state.password) && (state.password_confirmation === state.password) && (state.name != 0) ) {
            buttonRef.current.disabled = false
        } else {
            buttonRef.current.disabled = true
        }
    })
    
    console.log(props)

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Registration submitted")
        const userData = { 
            "name" : state.name,
            "email": state.email,
            "password": state.password,
            "password_verification": state.password,
            buttonDisabled: true
         }

        // api call to create user in mongodb
        API.signup(userData)
             .then(res => {
                 // check is user was created
                 if (res.data.status === "created") {
                    // run handleSuccessfulAuth which is given from props
                    handleSuccessfulAuth(res.data)
                 } 
            })    
             .catch(err => {console.log(err)})
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

    function handleChange(event) {

        event.preventDefault()
        // update password_errors
        if (event.target.name === "password") {
            setPasswordErrors(passwordSchema.validate(event.target.value, {list: true}))
            setState({
                ...state,
                [event.target.name]: event.target.value})
            
        } else {
            setState({
                ...state,
                [event.target.name]: event.target.value})
        }  
    }   

    // prints password requirements if they are not met
    function renderSwitch(param) {
        switch(param.error) {
            case 'min':
                return 'minimum 8 characters';
            case 'max':
                return 'maximum 32 characters';
            case 'lowercase':
                return 'use lowercase';
            case 'uppercase':
                return 'use uppercase';
            case 'digits':
                return 'use digits';
            default:
                return 'OK';
        }
      }
     
  
    return (
        <form onSubmit={handleSubmit}>
            <h3>Register your account</h3>

            <div className="form-group">
                <label>Name</label>
                <input 
                    type="text" 
                    name="name"
                    onChange={handleChange}
                    value={state.name}
                    className="form-control" 
                    placeholder="Enter name" 
                    ref={nameRef}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input 
                    type="email" 
                    name="email" 
                    value={state.email} 
                    onChange={handleChange}  
                    className="form-control" 
                    placeholder="Enter email"
                    ref={emailRef}
                    required 
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    name="password"
                    placeholder="Enter password"
                    value={state.password}
                    onChange={handleChange} 
                    className="form-control"
                    ref={passwordRef}
                    required 
                />

                <ul>
                {password_errors.map((error,index) => (
                    <li key={index}>{renderSwitch({error})}</li>
                ))}
                </ul>
              
            </div>

            <div className="form-group">
                <label>Password confirmation</label>
                <input 
                    type="password" 
                    name="password_confirmation"
                    placeholder="Password confirmation"
                    value={state.password_confirmation}
                    onChange={handleChange} 
                    className="form-control"
                    ref={passwordVRef}
                    required 
                />
            </div>

            <button type="submit" ref={buttonRef} className="btn btn-danger btn-block" disabled={state.buttonDisabled}>Register</button>
            <p className="text-right">
                Already registered <a href="/">sign in?</a>
            </p>
        </form>
    );
    
}

export default SignUp;