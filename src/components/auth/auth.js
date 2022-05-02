import React, { Component } from "react";
import LoginImage from "../../../static/assets/images/auth/WolfStare.jpg";

import Login from "./login";

export default class Auth extends Component {
	constructor(props) {
		super(props);

		this.handleGoodLogin = this.handleGoodLogin.bind(this);
		this.handleBadLogin = this.handleBadLogin.bind(this);
	}

	handleGoodLogin() {
		this.props.goodLogin();
		this.props.history.push("/");
	}

	handleBadLogin() {
		this.props.badLogin();
	}

	render() {
		return (
			<div className="auth-wrapper">
				<div
					className="left-side"
					style={{
						backgroundImage: `url(${LoginImage})`,
					}}
				/>

				<div className="right-side">
					<h2>Login Component goes here</h2>
					<Login
						GoodLogin={this.handleGoodLogin}
						BadLogin={this.handleBadLogin}
					/>
				</div>
			</div>
		);
	}
}
