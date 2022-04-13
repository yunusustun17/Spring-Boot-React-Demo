import React, {Component} from "react";
import Input from "../components/input";
import {withTranslation} from "react-i18next";
import {login} from "../api/apiClass";

class LoginPage extends Component {
    state = {
        username: null,
        password: null,
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
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Login</h1>
                    <Input label={t("Username")} name="username" onChange={this.onChange}/>
                    <Input label={t("Password")} name="password" type="password" onChange={this.onChange}/>
                    <div className="text-center">
                        <button onClick={this.onClickLogin} className="btn btn-primary">{t("Login")}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withTranslation()(LoginPage);