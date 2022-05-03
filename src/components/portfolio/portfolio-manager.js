import axios from "axios";
import React, { Component } from "react";

import PortfolioSidebar from "./portfolio-sidebar";

export default class PortfolioManager extends Component {
	constructor() {
		super();

		this.state = {
			portfolioItems: [],
		};
	}

	getPortfolioItems() {
		axios
			.get("https://nathanlamb.devcamp.space/portfolio/portfolio_items", {
				withCredentials: true,
			})
			.then((response) => {
				this.setState({
					portfolioItems: [...response.data.portfolio_items],
				});
			})
			.catch((error) => {
				console.log("error getting portlio Items in Manager", error);
			});
	}

	componentDidMount() {
		this.getPortfolioItems();
	}

	render() {
		return (
			<div className="manager-container">
				<div className="left-side">
					<h5>PortfolioManager</h5>
					<form className="add-manager"></form>
				</div>

				<div className="right-side">
					<PortfolioSidebar data={this.state.portfolioItems} />
				</div>
			</div>
		);
	}
}
