import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortFolioContainer extends Component {
	constructor() {
		super();

		this.state = {
			pageTitle: "Welcome to my Portfolio",
			isLoading: false,
			data: [],
		};
		this.handleFilter = this.handleFilter.bind(this);
	}

	getPortfolioItems() {
		axios
			.get("https://nathanlamb.devcamp.space/portfolio/portfolio_items")
			.then((response) => {
				// console.log("Api Get Response", response);
				this.setState({
					data: response.data.portfolio_items,
				});
			})
			.catch((error) => {
				console.log("Api Get Error", error);
			});
	}

	portfolioItems() {
		// const data = ["Quip","EventBrite","Ministry Safe"]
		// needed Data: bgImg, logo, description, id
		return this.state.data.map((item) => {
			console.log("Item details:", item);
			return <PortfolioItem key={item.id} item={item} />;
		});
	}

	handleFilter(filter) {
		this.setState({
			data: this.state.data.filter((item) => {
				return item.category === filter;
			}),
		});
	}

	componentDidMount() {
		this.getPortfolioItems();
	}

	render() {
		if (this.state.isLoading) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<h2>{this.state.pageTitle}</h2>

				<button onClick={() => this.handleFilter("eCommerce")}>
					eCommerce
				</button>
				<button onClick={() => this.handleFilter("Scheduling")}>
					Scheduling
				</button>
				<button onClick={() => this.handleFilter("Enterprise")}>
					Enterprise
				</button>

				{this.portfolioItems()}
			</div>
		);
	}
}
