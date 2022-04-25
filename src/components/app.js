import React, { Component } from "react";
import moment from "moment";

import PortFolioContainer from "./portfolio-items/portfolio-container";
import Navigation from "./navigation/nav";

export default class App extends Component {
	render() {
		return (
			<div className="app">
				<Navigation />
				<h1>Portfolio for Nathan Lamb</h1>
				<div>
					<h3>{moment().format("MMMM Do YYYY, h:mm:ss a")}</h3>
				</div>
				<h2>This Class is Awesome!</h2>
				<h1>
					{" "}
					<PortFolioContainer />{" "}
				</h1>
			</div>
		);
	}
}
