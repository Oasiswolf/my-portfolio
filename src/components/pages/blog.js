import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpider } from "@fortawesome/free-solid-svg-icons";

import BlogItem from "../blog/blog-item";

export default class Blog extends Component {
	constructor() {
		super();

		this.state = {
			blogItems: [],
			totalCount: 0,
			currentPage: 0,
			isLoading: true,
		};
		this.getBlogItems = this.getBlogItems.bind(this);
		this.onScroll = this.onScroll.bind(this);
		window.addEventListener("scroll", this.onScroll, false);
	}

	onScroll() {
		// console.log("window.innerHeight", window.innerHeight);
		// console.log("window.ScrollTop", document.documentElement.scrollTop);
		// console.log(
		// 	"window.OffsetHeight",
		// 	document.documentElement.offsetHeight
		// );
		if (
			this.state.isLoading ||
			this.state.blogItems.length === this.state.totalCount
		) {
			return;
		}
		if (
			window.innerHeight + document.documentElement.scrollTop - 17 ===
			document.documentElement.offsetHeight
		) {
			this.getBlogItems();
			console.log("Get More Posts");
		}
	}

	getBlogItems() {
		this.setState({
			currentPage: this.state.currentPage + 1,
		});
		axios
			.get(
				`https://nathanlamb.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				console.log("Blog Data:", response);
				this.setState({
					blogItems: this.state.blogItems.concat(
						response.data.portfolio_blogs
					),
					totalCount: response.data.meta.total_records,
					isLoading: false,
				});
			})
			.catch((error) => {
				console.log("Error Getting Blog Items:", error);
			});
	}

	UNSAFE_componentWillMount() {
		this.getBlogItems();
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll, false);
	}

	render() {
		const blogRecords = this.state.blogItems.map((blogItem) => {
			return <BlogItem key={blogItem.id} blogItem={blogItem} />;
		});
		return (
			<div className="blog-container">
				<div className="content-wrap">{blogRecords}</div>
				{this.state.isLoading ? (
					<div className="loader">
						<FontAwesomeIcon icon={faSpider} spin />
					</div>
				) : (
					<div>
						<Link to="/about">Read more about Me</Link>
					</div>
				)}
			</div>
		);
	}
}
