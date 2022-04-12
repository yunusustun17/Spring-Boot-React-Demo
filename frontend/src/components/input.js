import React from "react";

const Input = (props) => {
    const {label, error, onChange, name} = props;
    const className = error ? "form-control is-invalid" : "form-control";
    return (
        <div>
            <label>{label}</label>
            <input name={name} className={className} onChange={onChange}></input>
            <div className="invalid-feedback">{error}</div>
        </div>
    );
};

export default Input;