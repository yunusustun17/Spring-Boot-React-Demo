import {Component} from "react";
import axios from "axios";

class UserSignupPage extends Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        agreedClicked: false,
        pendingApiCall: false,
    }

    onChangeAgree = event => {
        this.setState({
            agreedClicked: event.target.checked
        })
    }

    onChange = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    onClickSignup = event => {
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

        axios.post("/api/1.0/users", body)
            .then(response => {
                this.setState({
                    pendingApiCall: false
                });
            }).catch(error => {
            this.setState({
                pendingApiCall: false
            });
        });
    }

    render() {
        return (
            <div className="container">
                <form className="form-group">
                    <h1 className="text-center">Sign Up</h1>
                    <div>
                        <label>Username</label>
                        <input name="username" className="form-control" onChange={this.onChange}></input>
                    </div>
                    <div>
                        <label>Display Name</label>
                        <input name="displayName" className="form-control" onChange={this.onChange}></input>
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
                                disabled={!this.state.agreedClicked || this.state.pendingApiCall}>
                            {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} Sign Up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserSignupPage;