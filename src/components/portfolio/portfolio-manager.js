import axios from "axios";
import React, { Component } from "react";

import PortfolioSidebar from "./portfolio-sidebar";
import PortfolioForm from "./portfolio-form";

export default class PortfolioManager extends Component {
	constructor() {
		super();

		this.state = {
			portfolioItems: [],
		};

		this.handleGoodFormSubmit = this.handleGoodFormSubmit.bind(this);
		this.handleBadFormSubmit = this.handleBadFormSubmit.bind(this);
	}

	handleGoodFormSubmit(portfolioItem) {
		this.setState({
			portfolioItems: [portfolioItem].concat(this.state.portfolioItems),
		});
	}

	handleBadFormSubmit(error) {
		console.log("Bad Form Submitted", error);
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
					<PortfolioForm
						goodSubmit={this.handleGoodFormSubmit}
						badSubmit={this.handleBadFormSubmit}
					/>
				</div>

				<div className="right-side">
					<PortfolioSidebar data={this.state.portfolioItems} />
				</div>
			</div>
		);
	}
}
