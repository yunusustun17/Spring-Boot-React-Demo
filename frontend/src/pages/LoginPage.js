import React, {Component} from "react";
import Input from "../components/input";
import {withTranslation} from "react-i18next";
import {login} from "../api/apiClass";
import axios from "axios";
import ButtonWithProgress from "../components/buttonWithProgress";

class LoginPage extends Component {
    state = {
        username: null,
        password: null,
        pendingApiCall: null,
    }

    componentDidMount() {
        axios.interceptors.request.use( request => {
            this.setState({pendingApiCall: true});
            return request;
        });

        axios.interceptors.response.use( response => {
            this.setState({pendingApiCall: false});
            return response;
        }, error => {
            this.setState({pendingApiCall: false});
            throw error;
        });
    }

    onChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    onClickLogin = event => {
        event.preventDefault();
        const {username, password} = this.state;
        const credentials = {
            username,
            password,
        }

        login(credentials)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log(response);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const {t} = this.props;
        const buttonEnabled = this.state.username && this.state.password;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Login</h1>
                    <Input label={t("Username")} name="username" onChange={this.onChange}/>
                    <Input label={t("Password")} name="password" type="password" onChange={this.onChange}/>
                    <div className="text-center">
                        <ButtonWithProgress
                            text={t("Login")}
                            onClick={this.onClickLogin}
                            pendingApiCall={this.state.pendingApiCall}
                            disabled={!buttonEnabled || this.state.pendingApiCall}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default withTranslation()(LoginPage);