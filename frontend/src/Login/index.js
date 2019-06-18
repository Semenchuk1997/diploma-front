import React, { Component } from 'react';
import './index.css';

const REGISTER_BUTTON_TEXT = 'Register';
const BACK_BUTTON_TEXT = 'Back';

const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
const DUID_VALUE = 'UE32ES5500W';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            duid: '',
            password: '',
            confirmPassword: '',
            isRegistration: false
        }

        this.isFormValid = this.isFormValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    logIn(user) {
        const { history } = this.props;
        const users = [];

        if (localStorage.getItem('users') !== null) {
            users.push(...JSON.parse(localStorage.getItem('users')));
        }

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
        history.push('/gallery');
        this.setState({ isRegistration: false });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { username, duid, password, confirmPassword, isRegistration } = this.state;

        const user = {
            username,
            duid,
            password,
            confirmPassword,
        };

        if (!isRegistration) {
            if (!!users.find(user => user.username === username)) {
                this.logIn(user);
            } else {
                this.setState({ isShowHelpInfo: true })
            }
        } else {
            this.logIn(user);
        }
    }

    isFormValid() {
        const {
            username,
            duid,
            password,
            confirmPassword,
            isRegistration
        } = this.state;
        
        let isValid = username && duid && password;

        if (isRegistration) {
            isValid =  isValid && password === confirmPassword;
        }

        return isValid;
    }

    registration() {
        this.setState({ isRegistration: true });
    }

    render() {
        return (
            <form className="login-page" onSubmit={this.handleSubmit}>
                <h2 className="text-center">Welcome</h2>
                <div className="form-group">
                    <label>Username *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        onChange={(e) => this.setState({ username: e.target.value })}
                        onFocus={() => this.setState({ isShowHelpInfo: false })}
                    />
                    {this.state.isShowHelpInfo ? <small id="emailHelp" className="form-text text-danger">User doesn't exist!</small> : null}
                </div>
                <div className="form-group" hidden={!this.state.isRegistration}>
                    <label>DUID *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter DUID"
                        onChange={(e) => this.setState({ duid: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Password *</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                </div>
                <div className="form-group" hidden={!this.state.isRegistration}>
                    <label>Confirm Password *</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    disabled={!this.isFormValid()}
                >
                    Submit
                </button>
                <h5 className="text-center" hidden={this.state.isRegistration}>OR</h5>
                <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block mt-2"
                    onClick={() => this.setState({ isRegistration: true })}
                >
                    {this.state.isRegistration ? BACK_BUTTON_TEXT : REGISTER_BUTTON_TEXT}
                </button>
            </form>
        );
    }
};

export default Login;