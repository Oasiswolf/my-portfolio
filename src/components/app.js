import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faTrashAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import Navigation from "./navigation/nav";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./blog/blog-detail";
import Auth from "./auth/auth";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from "./portfolio/portfolio-manager";
import WrongLink from "./pages/wrong-link";

// library.add(faTrashAlt, faSignOutAlt);

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
					this.setState({
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
		return [
			<Route
				key="portMan"
				path="/portMan"
				component={PortfolioManager}
			/>,
		];
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
							<Route
								path="/blog"
								render={(props) => (
									<Blog
										{...props}
										login={this.state.loggedInStatus}
									/>
								)}
							/>
							{this.state.loggedInStatus === "LOGGED_IN"
								? this.authorizedPages()
								: null}
							<Route
								exact
								path="/detail/:slug"
								component={PortfolioDetail}
							/>
							<Route
								exact
								path="/b-detail/:slug"
								component={BlogDetail}
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
