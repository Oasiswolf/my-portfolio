import axios from "axios";
import React, { Component } from "react";

import PortfolioSidebar from "./portfolio-sidebar";
import PortfolioForm from "./portfolio-form";

export default class PortfolioManager extends Component {
	constructor() {
		super();

		this.state = {
			portfolioItems: [],
			portfolioEdit: {},
		};

		this.handleGoodFormSubmit = this.handleGoodFormSubmit.bind(this);
		this.handleBadFormSubmit = this.handleBadFormSubmit.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.clearEditPortfolio = this.clearEditPortfolio.bind(this);
		this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
	}

	clearEditPortfolio() {
		this.setState({
			portfolioEdit: {},
		});
	}

	handleEditClick(portfolioItem) {
		this.setState({
			portfolioEdit: portfolioItem,
		});
	}

	handleDeleteClick(portfolioItem) {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
				{ withCredentials: true }
			)
			.then((response) => {
				this.setState({
					portfolioItems: this.state.portfolioItems.filter((item) => {
						return item.id != portfolioItem.id;
					}),
				});
				return response.data;
			})
			.catch((error) => {
				console.log("error Deleting Post:", error);
			});
	}

	handleEditFormSubmit() {
		this.getPortfolioItems();
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
						editSubmit={this.handleEditFormSubmit}
						badSubmit={this.handleBadFormSubmit}
						clear={this.clearEditPortfolio}
						portEdit={this.state.portfolioEdit}
					/>
				</div>

				<div className="right-side">
					<PortfolioSidebar
						data={this.state.portfolioItems}
						deleteClick={this.handleDeleteClick}
						edit={this.handleEditClick}
					/>
				</div>
			</div>
		);
	}
}
