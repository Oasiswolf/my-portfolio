import React, { Component } from "react";
import axios from "axios";

export default class BlogDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentId: this.props.match.params.slug,
			blogItem: {},
		};
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
		return (
			<div className="blog-container">
				<div className="content-wrap">
					<h3>{title}</h3>
					<div className="img-wrap">
						<img src={featured_image_url} />
					</div>
					<div className="content">{content}</div>
					{blog_status}
				</div>
			</div>
		);
	}
}
