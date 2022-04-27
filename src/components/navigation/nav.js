import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Navigation extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<h2>Navigation</h2>
				<NavLink exact to="/">
					Home
				</NavLink>
				<NavLink to="/about">About Me</NavLink>
				<NavLink to="/contact">Contact</NavLink>
				<NavLink to="/blog">About Me</NavLink>
				{/* <button>Home</button>
				<button>About</button> */}
				{/* <button>Contact</button>
				<button>Blog</button> */}
				{false ? <button>Add Blog</button> : null}
			</div>
		);
	}
}
