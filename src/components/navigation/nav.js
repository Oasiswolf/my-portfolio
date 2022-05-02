import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { withRouter } from "react-router";

const Navigation = (props) => {
	const dynamicLink = (route, linkText) => {
		return (
			<div className="nav-link">
				<NavLink to="/blog">Blog</NavLink>
			</div>
		);
	};

	const handleSignOut = () => {
		axios
			.delete("https://api.devcamp.space/logout", {
				withCredentials: true,
			})
			.then((response) => {
				console.log("Users is Logged Out!", response);
				if (response.status === 200) {
					props.history.push("/");
					props.logOut();
				}
				return response.data;
			})
			.catch((error) => {
				console.log("Error Signing Out!", error);
			});
	};

	return (
		<div className="nav-wrapper">
			<div className="left-wrapper">
				Today's Date: {moment().format("MMMM Do YYYY")}
			</div>
			<div className="middle-wrapper">
				<div className="nav-link">
					<NavLink exact to="/">
						Home
					</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/about">About</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/contact">Contact</NavLink>
				</div>
				{props.loginStatus === "LOGGED_IN"
					? dynamicLink("/blog", "Blog")
					: null}
				<div className="nav-link">
					{false ? <button>Add Blog</button> : null}
				</div>
			</div>
			<div className="right-wrapper">
				Nathan Lamb <hr />
				{props.loginStatus === "LOGGED_IN" ? (
					<a onClick={handleSignOut}>Sign Out</a>
				) : null}
			</div>
		</div>
	);
};

export default withRouter(Navigation);
