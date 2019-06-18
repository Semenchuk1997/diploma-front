import React, { Component } from  'react';
import './index.css';

class UserCorner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowLogOut: false
        }

        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleLogOut() {
        const { history } = this.props;
        history.push('/');
    }

    handleMouseOver() {
        this.setState({ isShowLogOut: true });
    }

    handleMouseLeave() {
        this.setState({ isShowLogOut: false });
    }

    render() {
        const user = JSON.parse(localStorage.getItem('users'))[0];

        return (
            <div
                className="UserCorner"
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
            >
                <h4>Welcome</h4>
                <div>{user.username}</div>
                {this.state.isShowLogOut ?
                    <div
                        className="logout"
                        onClick={this.handleLogOut}
                    >Log out</div> :
                    null
                }             
            </div>
        );
    }
};

export default UserCorner;