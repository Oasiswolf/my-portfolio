import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			errorText: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		axios
			.post(
				"https://api.devcamp.space/sessions",
				{
					client: {
						email: this.state.email,
						password: this.state.password,
					},
				},
				{ withCredentials: true }
			)
			.then((response) => {
				if (response.data.status === "created") {
					this.setState({
						errorText: "Login Success!",
					});
					this.props.GoodLogin();
				} else {
					this.setState({
						errorText: "Invalid Login Credintials!",
						email: "",
						password: "",
					});
					this.props.BadLogin();
				}
			})
			.catch((error) => {
				console.log("Login Error", error);
				this.setState({
					errorText: "An Error Occured!",
				});
				this.props.BadLogin();
			});
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
			errorText: "",
		});
	}

	render() {
		return (
			<div>
				<div>{this.state.errorText}</div>
				<form className="login-form" onSubmit={this.handleSubmit}>
					<div className="inputs">
						<input
							type="email"
							name="email"
							id="login-email"
							placeholder="Email Me Please"
							value={this.state.email}
							onChange={this.handleChange}
						/>
						<input
							type="password"
							name="password"
							id="login-password"
							placeholder="Password Pretty Please"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>
					<div className="button">
						<button className="btn" type="submit">
							Login
						</button>
					</div>
				</form>
			</div>
		);
	}
}
