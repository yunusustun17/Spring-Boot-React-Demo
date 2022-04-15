import React from "react";

const ButtonWithProgress = (props) => {
    const {onClick, text, pendingApiCall, disabled} = props;
    return (
        <button
            className="btn btn-primary"
            onClick={onClick}
            disabled={disabled}
        >
            {props.children}
            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} {text}
        </button>
    );
}

export default ButtonWithProgress;