import {Component} from "react";
import {signup} from "../api/apiClass";
import Input from "../components/input";
import {withTranslation} from 'react-i18next';

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
        const {t} = this.props;
        const {name, value} = event.target;
        const {errors} = {...this.state};
        errors[name] = null;
        if (name === "password" || name === "passwordRepeat") {
            if (name === "password" && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t("Passwords do not match");
            } else if (name === "passwordRepeat" && value !== this.state.password) {
                errors.passwordRepeat = t("Passwords do not match");
            } else {
                errors.passwordRepeat = null;
            }
        }
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
    }

    render() {
        const {t} = this.props;
        const {pendingApiCall, errors, agreedClicked} = this.state;
        const {username, displayName, password, passwordRepeat} = errors;
        return (
            <div className="container">
                <form className="form-group">
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name="username" label={t('Username')} error={username} onChange={this.onChange}/>
                    <Input name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange}/>
                    <Input name="password" label={t('Password')} type="password" error={password}
                           onChange={this.onChange}/>
                    <Input name="passwordRepeat" label={t('Repeat Password')} type="password" error={passwordRepeat}
                           onChange={this.onChange}/>
                    <div>
                        <input name="agreedClicked" className="form-check" type="checkbox"
                               onChange={this.onChangeAgree}></input> Agreed
                    </div>
                    <div className="text-center">
                        <button onClick={this.onClickSignup} className="btn btn-primary"
                                disabled={!agreedClicked || pendingApiCall || passwordRepeat}>
                            {pendingApiCall &&
                                <span className="spinner-border spinner-border-sm"></span>} {t('Sign Up')}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);

export default UserSignupPageWithTranslation;