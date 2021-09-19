import React from 'react';
import './css/Input.css';

function isInvalid({valid,touched,shouldValidate}) {
   return !valid && shouldValidate && touched
}

function SuccessPassword ({success}) {
    return success
}

const Input = props => {
    const inputType = props.type || 'text';
      
    return (
        <div className = "Input">
            <label>{props.label}</label>
            <input
                type = {inputType}
                value = {props.value}
                onChange = {props.onChange}
            />
            { isInvalid(props) ? <span>{props.errorMessage}</span> : null }
            {SuccessPassword(props) ? <span>{props.successMessage}</span> : null }
        </div>
    )
}
export default Input