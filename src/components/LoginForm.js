import React from 'react'
import Input from './Input'
import is from 'is_js'
import {NavLink} from 'react-router-dom';
import fire from '../config/fire'
import $ from 'jquery';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            isFormValid: false,
            formControls: {
              email: {
                value:'',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter the correct email address',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
              },
              password: {
                value:'',
                type: 'password',
                label: 'Password',
                errorMessage: 'The password must have more than 6 characters',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
              }
            }
        };
    }
    SubmitHandler = event => {
        event.preventDefault();
    }
    validateControl(value,validation) {
        if (!validation) return true
        let isValid = true
        if (validation.required) {
         isValid = value.trim()!== '' && isValid
        }
        if (validation.minLength) {
            isValid = value.length >=validation.minLength && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        return isValid
    }
    onChangeHandler = (event,controlName) => {
     const formControls = {...this.state.formControls}
     const control = {...formControls[controlName]}
     control.value = event.target.value
     control.touched = true
     control.valid = this.validateControl(control.value, control.validation)
     formControls[controlName] = control

     let isFormValid = true
     Object.keys(formControls).forEach(name => {
         isFormValid = formControls[name].valid && isFormValid
     })
     this.setState({
         formControls,isFormValid
     })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName,index) => {
            const control = this.state.formControls[controlName];
          return (
              <Input
                class = "Input"
                key = {controlName + index}
                type = {control.type}
                value = {control.value}
                valid = {control.valid}
                touched = {control.touched}
                label = {control.label}
                shouldValidate = {!!control.validation}
                errorMessage = {control.errorMessage}
                onChange = {event => this.onChangeHandler(event,controlName)}
              />
          )
        })
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.formControls.email.value,
            this.state.formControls.password.value).then((u)=>{
                window.location.href = "/"
        }).catch((error) => {
          $('.form__user').css("display","block")
          console.log(error);
        });
    }
    
    render() {
        return (
        <div className = "form_page">
            <div className = "container registr_wrap">
                <div className = "form">
                    <h3>Log in to your account</h3>
                    <p>To use the editing and rating features of TMDb, as well as receive personal recommendations, you must log in to your account.
                        If you don't have an account, registering it is free and easy.<br/> 
                        <NavLink to = "../registration" style = {{color:'#32CD32'}}>Click here</NavLink>, to get started.</p>
                    <form className = "form__inner">
                        {
                            this.renderInputs()
                        }
                        <p className = "form__user">The user is not found</p>
                        <input type = "submit" value = "Login" onClick = {this.login} className = 'btn btn-success btn-form' disabled ={!this.state.isFormValid} ></input>
                    </form>
                </div>
            </div>
        </div>
        )
    } 
}
export default LoginForm;