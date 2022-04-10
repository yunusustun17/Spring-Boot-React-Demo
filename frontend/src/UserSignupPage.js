import { Component } from "react";

class UserSignupPage extends Component {
    render() {
        return (
            <form>
                <h1>Sign Up</h1>
                <div>
                    <label>Username</label>
                    <input></input>
                </div>
                <div>
                    <label>Display Name</label>
                    <input></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"></input>
                </div>
                <div>
                    <label>Password Repeat</label>
                    <input type="password"></input>
                </div>
                <div>
                    <button>Sign Up</button>
                </div>
            </form>
        );
    }
}

export default UserSignupPage;