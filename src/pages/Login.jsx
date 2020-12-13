import React from "react";
import {Link, Redirect} from "react-router-dom";
import logo from "../../public/images/logo.png";
import {connect} from 'react-redux';
import { updateToken, updateUser } from "../store/actions";

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            credentials : {},
            errors : {},
            redirect : false,
            isUsername : false
        }
    }   

    handleChange = (e, field) => {
        let credentials = this.state.credentials;
        credentials[field] = e.target.value;
        this.setState({credentials});
    }

    handleValidation = () => {
        const credentials = this.state.credentials;
        let errors = {};
        let validationStatus = true;
        let isUsername = true;
        
        if(!credentials.username){
            errors["username"] = "Cannot be empty"
            validationStatus = false
        }
        if(typeof credentials["username"] !== "undefined"){

            credentials["username"].includes('@') ? isUsername = false : isUsername = true
            
            if(isUsername){
                if(/^\w{0,5}$/.test(credentials["username"])){
                    validationStatus = false;
                    errors["username"] = "More than 5 letters";
                }   
            }
            if(!isUsername){
                if (!/\S+@\S+\.\S+/.test(credentials["username"])){
                    validationStatus = false;
                    errors["username"] = "Must be a valid email";
                }  
            }
        }
        if(!credentials.password){
            errors["password"] = "Cannot be empty"
            validationStatus = false
        }
        if(typeof credentials["password"] !== "undefined"){
            if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(credentials.password)){
                errors["password"] = "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase"
                validationStatus = false
            }    
            if(!credentials.password == credentials.cfmPassword){
                errors["cfmPassword"] = "Passwords do not match"
                validationStatus = false
            }
        }

        this.setState({
            errors : errors,
        })
        
        return validationStatus;
        
    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleLogin()
        /*if(this.handleValidation()){
            this.handleLogin()
        }else{
            console.log("NOT OK")
        }*/
    }

    handleLogin = () => {
        var body =  {
            ...this.state.credentials
        }

        this.state.credentials.username.includes('@') ?  body.isUsername = false :  body.isUsername = true;

        fetch('/api/login', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(body)
        })
        .then(res => {
            if(!res.ok){
                console.log('Login failed');
            }
            return res.json();
        })
        .then(res => {
            console.log(res);
            this.props.updateUser(res.user);
            this.props.updateToken(res.token);
            this.setState({
                redirect : true
            })
        })
        .catch(err => console.log(err));
    }

    handleClick = () => {
        console.log("signup")
    }

    withFacebook = () => {
        console.log("facebook login")
    }

    render(){
        const {redirect} = this.state;

        if(redirect){
            return <Redirect to="/"/>
        }

        return (
            <div className="login-body" onSubmit={this.handleSubmit}>
                <form className="form-body">
                    <div className="logo-container">
                        <img src={logo} alt="" className="logo"/>
                        <div className="logo-title">ReactMessenger</div>
                    </div>
                    <div className="divider"></div>
                    <div className="login-to-continue">To continue, log in.</div>
                    <button className="login-with-facebook" onClick={this.withFacebook} style={{outline : 'none'}}>LOG IN WITH FACEBOOK</button>
                    <div className="or-divider">
                        <div className="line"></div>
                        <div>OR</div>
                        <div className="line"></div>
                    </div>
                    <input type="text" placeholder="Email address or username" className="login-username-or-email" onChange={(e) => this.handleChange(e,"username")} value={this.state.credentials["username"] || ""}/>   
                    <div className="error">{this.state.errors["username"]}</div>
                    <input type="password" placeholder="Password" className="login-password" onChange={(e) => this.handleChange(e,"password")} value={this.state.credentials["password"] || ""}/>
                    <div className="error">{this.state.errors["password"]}</div>
                    <input type="submit" className="login-button" value="LOG IN" style={{outline: 'none'}}/>
                    <div className="divider"></div>
                    <div className="no-account">Don't have an account?</div>
                    <Link to="/signup">
                        <button className="redirect-button" value="SIGN UP" onClick={this.handleClick} style={{outline: 'none'}}>SIGN UP</button>
                    </Link>
                </form>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        updateUser : user => dispatch(updateUser(user)),
        updateToken : token => dispatch(updateToken(token))
    }
}

export default connect(null, mapDispatchToProps)(Login);