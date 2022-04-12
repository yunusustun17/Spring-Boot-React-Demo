import {Component} from "react";
import {signup} from "../api/apiClass";

class UserSignupPage extends Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        agreedClicked: false,
        pendingApiCall: false,
        errors: {
            username: null,
            displayName: null,
            password: null,
            passwordRepeat: null,
            agreed: null
        }
    }

    onChangeAgree = event => {
        this.setState({
            agreedClicked: event.target.checked
        })
    }

    onChange = event => {
        const {name, value} = event.target;
        const {errors} = {...this.state};
        errors[name] = null;
        this.setState({
            [name]: value,
            errors
        })
    }

    onClickSignup = async event => {
        event.preventDefault();
        const {username, displayName, password, passwordRepeat, agreedClicked} = this.state;
        const body = {
            username,
            displayName,
            password,
        }

        this.setState({
            pendingApiCall: true
        });

        try {
            const response = await signup(body);
            if (response.status === 200) {
                console.log("redirect to /login");
            }
        } catch (error) {
            const {validationErrors} = error.response.data;
            if (validationErrors) {
                this.setState({
                    errors: error.response.data.validationErrors,
                })
            }
            console.log(error);
        } finally {
            this.setState({
                pendingApiCall: false
            });
        }

        // signup(body)
        //     .then(response => {
        //         this.setState({
        //             pendingApiCall: false
        //         });
        //     }).catch(error => {
        //     this.setState({
        //         pendingApiCall: false
        //     });
        // });
    }

    render() {
        const {pendingApiCall, errors, agreedClicked} = this.state;
        const {username, displayName} = errors;
        return (
            <div className="container">
                <form className="form-group">
                    <h1 className="text-center">Sign Up</h1>
                    <div>
                        <label>Username</label>
                        <input name="username" className={username ? "form-control is-invalid" : "form-control"}
                               onChange={this.onChange}></input>
                        <div className="invalid-feedback">{username}</div>
                    </div>
                    <div>
                        <label>Display Name</label>
                        <input name="displayName" className={displayName ? "form-control is-invalid" : "form-control"} onChange={this.onChange}></input>
                        <div className="invalid-feedback">{displayName}</div>
                    </div>
                    <div>
                        <label>Password</label>
                        <input name="password" className="form-control" type="password"
                               onChange={this.onChange}></input>
                    </div>
                    <div>
                        <label>Password Repeat</label>
                        <input name="passwordRepeat" className="form-control" type="password"
                               onChange={this.onChange}></input>
                    </div>
                    <div>
                        <input name="agreedClicked" className="form-check" type="checkbox"
                               onChange={this.onChangeAgree}></input> Agreed
                    </div>
                    <div className="text-center">
                        <button onClick={this.onClickSignup} className="btn btn-primary"
                                disabled={!agreedClicked || pendingApiCall}>
                            {pendingApiCall &&
                                <span className="spinner-border spinner-border-sm"></span>} Sign Up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserSignupPage;