import React from "react";
import {Link, Redirect} from "react-router-dom";
import logo from "../../public/images/logo.png";

class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            credentials : {},
            errors : {},
            redirect : false
        }
    }   

    componentDidMount(){
    }

    handleChange = (e,field) => {
        let credentials = this.state.credentials;
        credentials[field] = e.target.value;
        this.setState({credentials});
    }

    handleValidation = () => {
        const credentials = this.state.credentials;
        let errors = {};
        let validationStatus = true;
        if(!credentials["email"]){
            validationStatus = false;
            errors["email"] = "Cannot be empty";
        }
        if(typeof credentials["email"] !== "undefined"){
            if (!/\S+@\S+\.\S+/.test(credentials["email"])){
                errors["email"] = "Must be a valid email";
            }
        }  

        if(!credentials.username){
            errors["username"] = "Username field cant be empty"
            validationStatus = false
        }
        if(typeof credentials["username"] !== "undefined"){
            if(/^\w{0,5}$/.test(credentials["username"])){
                validationStatus = false;
                errors["username"] = "More than 5 letters";
            }        
        }
        if(!credentials.password){
            errors["password"] = "Cannot be empty"
            validationStatus = false
        }
        if(!credentials.cfmPassword){
            errors["cfmPassword"] = "Cannot be empty"
            validationStatus = false
        }
        if(typeof credentials["password"] !== "undefined"){
            if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(credentials.password)){
                errors["password"] = "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase"
                validationStatus = false
            }    
            if(credentials.password != credentials.cfmPassword){
                errors["cfmPassword"] = "Passwords do not match"
                validationStatus = false
            }
        }
        this.setState({
            errors : errors
        })
        return validationStatus;
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.handleValidation()){
            this.handleSignup();
        }else{
            console.log("NOT OK")
        }

    }

    handleSignup = () => {
        fetch('/api/signup', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state.credentials)
        })
        .then(res => {
            if(!res.ok){
                console.log("Signup failed")
            }
            if(res.ok){
                this.setState({
                    redirect : true
                })
            }
            return res;
        })
        .then(user => console.log(user))
        .catch(err => console.log(err))

    }

    withFacebook = () => {
        console.log("NOT IMPLEMENTED: facebook login")
    }


    render(){
        const {redirect} = this.state;

        if(redirect){
            return <Redirect to="/login"/>
        }

        return (
            <div className="signup-body" onSubmit={this.handleSubmit.bind(this)}>
                <form className="form-body">
                    <div className="logo-container">
                        <img src={logo} alt="" className="logo"/>
                        <div className="logo-title">ReactMessenger</div>
                    </div>
                    <div className="divider"></div>
                    <div className="signup-here">Sign up here..</div>
                    <button className="signup-with-facebook" onClick={this.withFacebook} style={{outline : 'none'}}>SIGN UP WITH FACEBOOK</button>
                    <div className="or-divider">
                        <div className="line"></div>
                        <div>OR</div>
                        <div className="line"></div>
                    </div>
                    <input type="text" placeholder="Email" className="signup-email" name="email" onChange={(e) => this.handleChange(e,"email")} value={this.state.credentials["email"] || ""}/>   
                    <div className="error">{this.state.errors["email"]}</div>
                    <input type="text" placeholder="Username" className="signup-username" name="username" onChange={(e) => this.handleChange(e,"username")} value={this.state.credentials["username"] || ""}/>
                    <div className="error">{this.state.errors["username"]}</div>
                    <input type="password" placeholder="Password" className="signup-password" name="password" onChange={(e) => this.handleChange(e, "password")} value={this.state.credentials["password"] || ""}/>
                    <div className="error">{this.state.errors["password"]}</div>
                    <input type="password" placeholder="Confirm password" className="signup-cfm-password" name="cfmPassword" onChange={(e) => this.handleChange(e, "cfmPassword")} value={this.state.credentials["cfmPassword"] || ""}/>
                    <div className="error">{this.state.errors["cfmPassword"]}</div>
                    <input type="submit" className="signup-button" value="SIGN UP" style={{outline: 'none'}}/>
                    <div className="divider"></div>
                    <div className="already-have-account">Already have an account?</div>
                    <Link to="/login">
                        <button className="redirect-button" style={{outline: 'none'}}>LOG IN</button>
                    </Link>
                </form>
            </div>
        );
    }

}

export default Signup;