import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogImg from "./blogImg";
import BlogForm from "./blog-form";

export default class BlogDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentId: this.props.match.params.slug,
			blogItem: {},
			editMode: false,
		};

		this.handleEdit = this.handleEdit.bind(this);
	}

	handleEdit() {
		console.log("edit enabled:");
		this.setState({});
	}

	getBlogItem() {
		axios
			.get(
				`https://nathanlamb.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
			)
			.then((response) => {
				this.setState({
					blogItem: response.data.portfolio_blog,
				});
			})
			.catch((error) => {
				console.log("Error getting Blog Detail:", error);
			});
	}

	componentDidMount() {
		this.getBlogItem();
	}

	render() {
		const { title, content, featured_image_url, blog_status } =
			this.state.blogItem;
		const contentManager = () => {
			if (this.state.editMode) {
				return <BlogForm />;
			} else {
				return (
					<div className="content-wrap">
						<h3>{title}</h3>
						<BlogImg img={featured_image_url} />
						<div className="content">
							{ReactHtmlParser(content)}
						</div>
						{blog_status}
					</div>
				);
			}
		};

		return <div className="blog-container">{contentManager()}</div>;
	}
}
