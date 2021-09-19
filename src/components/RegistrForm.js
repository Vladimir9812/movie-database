import React from 'react';
import Input from './Input';
import is from 'is_js';
import { NavLink } from 'react-router-dom';
import fire from '../config/fire';
import $ from 'jquery';

class RegistrForm extends React.Component {
    constructor(props) {
        super(props);
        this.signup = this.signup.bind(this);
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
              password_one: {
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
              },
              password_two: {
                value:'',
                type: 'password',
                label: ' Repeat Password',
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
            const control = this.state.formControls[controlName]
              return (
                <Input
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
    signup(e){
        e.preventDefault();
        if (this.state.formControls.password_one.value === this.state.formControls.password_two.value) {
            fire.auth().createUserWithEmailAndPassword(this.state.formControls.email.value,
                this.state.formControls.password_one.value).then(() => {window.location.href = '/'})
                .catch((error) => {
                    console.log(error)
                })
        }else  {
            $('#nosuccess').css('display','block')
            $('#nosuccess').val('Passwords not matched')
        }
    }
    
    render() {
        return (
        <div className = "form_page">
            <div className = "container registr_wrap">
                <div className = "form">
                    <h3>Register an account</h3>
                    <p>Creating an account is free and easy.Fill out the form below,<br/>to start.</p>
                    <form className = "form__inner" onChange = {this.SubmitHandler}>
                        {
                            this.renderInputs()
                        }
                        <span id = "nosuccess">Passwords not matched!</span>
                        <p>By clicking the "Register" button below, I confirm that I have read and agree to The terms of use and privacy Policy.</p>
                        <div className = "form__buttons">
                            <input type = "submit" value = "Registration" onClick = {this.signup}  className = 'btn btn-success btn-registr' disabled ={!this.state.isFormValid}></input>
                            <NavLink to = "../"><input type = "submit" value = "Cancel"  className = 'btn btn-outline-secondary btn-otmena'></input></NavLink>
                        </div>
                    </form>
                </div>
                <div className = "advantage">
                    <div className = "advantage_head"><h3>Membership benefits</h3></div>
                    <div className = "advantage_list">
                        <ul>
                            <li>Log tracked movies and TV shows</li>
                            <li>Track your favorite movies and TV shows and get recommendations based on them</li>
                            <li>Creating and maintaining a personal tracking list</li>
                            <li>Creating your own mixed lists (movies and TV)</li>
                            <li>Participation in discussions of films and TV shows</li>
                            <li>The introduction and improvement of the information in our database</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    
        )
    }
}

export default RegistrForm;