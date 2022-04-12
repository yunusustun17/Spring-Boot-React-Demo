import {Component} from "react";
import {signup} from "../api/apiClass";
import Input from "../components/input";

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
                    <Input name="username" label="Username" error={username} onChange={this.onChange}/>
                    <Input name="displayName" label="Display Name" error={displayName} onChange={this.onChange}/>
                    <Input name="password" label="Password" type="password" error={errors.password} onChange={this.onChange}/>
                    <Input name="passwordRepeat" label="Repeat Password" type="password" error={errors.passwordRepeat} onChange={this.onChange}/>
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