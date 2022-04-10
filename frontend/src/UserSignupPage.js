import { Component } from "react";

class UserSignupPage extends Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        agreedClicked: false
    }

    onChangeAgree = event => {
        this.setState({
            agreedClicked: event.target.checked
        })
    }

    onChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <form>
                <h1>Sign Up</h1>
                <div>
                    <label>Username</label>
                    <input name="username" onChange={this.onChange}></input>
                </div>
                <div>
                    <label>Display Name</label>
                    <input name="displayName" onChange={this.onChange}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" onChange={this.onChange}></input>
                </div>
                <div>
                    <label>Password Repeat</label>
                    <input name="passwordRepeat" type="password" onChange={this.onChange}></input>
                </div>
                <div>
                    <input name="agreedClicked" type="checkbox" onChange={this.onChangeAgree}></input> Agreed
                </div>
                <div>
                    <button disabled={!this.state.agreedClicked}>Sign Up</button>
                </div>
            </form>
        );
    }
}

export default UserSignupPage;