import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Navigation from "./navigation/nav";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import Auth from "./auth/auth";
import PortfolioDetail from "./portfolio-items/portfolio-detail";
import WrongLink from "./pages/wrong-link";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedInStatus: "NOT_LOGGED_IN",
		};

		this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
		this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
		this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
	}

	handleSuccessfulLogin() {
		this.setState({
			loggedInStatus: "LOGGED_IN",
		});
	}

	handleUnsuccessfulLogin() {
		this.setState({
			loggedInStatus: "NOT_LOGGED_IN",
		});
	}

	handleSuccessfulLogout() {
		this.setState({
			loggedInStatus: "NOT_LOGGED_IN",
		});
	}

	checkLoginStatus() {
		return axios
			.get("https://api.devcamp.space/logged_in", {
				withCredentials: true,
			})
			.then((response) => {
				console.log("Login Status Check", response);
				const loggedIn = response.data.logged_in;
				const loggedInStatus = this.state.loggedInStatus;

				if (loggedIn && loggedInStatus === "LOGGED_IN") {
					return loggedIn;
				} else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
					THIS.setState({
						loggedInStatus: "LOGGED_IN",
					});
				} else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
					this.setState({
						loggedInStatus: "NOT_LOGGED_IN",
					});
				}
			})
			.catch((error) => {
				console.log("Error Checking Status", error);
			});
	}

	componentDidMount() {
		this.checkLoginStatus();
	}

	authorizedPages() {
		return [<Route path="/blog" component={Blog} />];
	}

	render() {
		return (
			<div className="container">
				<Router>
					<div>
						<Navigation
							loginStatus={this.state.loggedInStatus}
							logOut={this.handleSuccessfulLogout}
						/>
						<h3>{this.state.loggedInStatus}</h3>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route
								path="/auth"
								render={(props) => (
									<Auth
										{...props}
										goodLogin={this.handleSuccessfulLogin}
										badLogin={this.handleUnsuccessfulLogin}
									/>
								)}
							/>
							<Route path="/about" component={About} />
							<Route path="/contact" component={Contact} />
							{this.state.loggedInStatus === "LOGGED_IN"
								? this.authorizedPages()
								: null}
							<Route
								exact
								path="/detail/:slug"
								component={PortfolioDetail}
							/>
							<Route component={WrongLink} />
						</Switch>
					</div>
				</Router>

				<div className="footer-wrapper">
					<div></div>
					<div className="footer">
						<h2>The March 7 2022 Class is Awesome!</h2>
					</div>
					<div></div>
				</div>
			</div>
		);
	}
}
