import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default class Navigation extends Component {
	constructor() {
		super();
	}
	// setInterval(({moment}) => {
	// 	moment
	// }, 1000);
	render() {
		return (
			<div className="nav-wrapper">
				<div className="left-wrapper">
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
					<div className="nav-link">
						<NavLink to="/blog">Blog</NavLink>
					</div>
					<div className="nav-link">
						{false ? <button>Add Blog</button> : null}
					</div>
				</div>
				<div className="middle-wrapper">
					Today's Date: {moment().format("MMMM Do YYYY")}
				</div>
				<div className="right-wrapper">Nathan Lamb</div>
			</div>
		);
	}
}
