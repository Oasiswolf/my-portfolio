import React, { Component } from "react";
import axios from "axios";

export default class BlogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			blog_status: "",
			content: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	buildForm() {
		let formData = new FormData();

		formData.append("portfolio_blog[title]", this.state.title);
		formData.append("portfolio_blog[blog_status]", this.state.blog_status);
		formData.append("portfolio_blog[content]", this.state.content);

		return formData;
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		axios
			.post(
				"https://nathanlamb.devcamp.space/portfolio/portfolio_blogs",
				this.buildForm(),
				{ withCredentials: true }
			)
			.then((response) => {
				this.props.formSubmit(response.data);
			})
			.catch((error) => {
				console.log("Blog Form Submit Error", error);
			});

		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<h2>Blog Form Goes Here....</h2>
				</div>
				<div className="text-input">
					<input
						type="text"
						name="title"
						onChange={this.handleChange}
						placeholder="Blog Name"
						value={this.state.title}
					/>
					<input
						type="text"
						name="blog_status"
						onChange={this.handleChange}
						placeholder="Status"
						value={this.blog_status}
					/>
				</div>
				<div className="content-wrap">
					<textarea
						name="content"
						onChange={this.handleChange}
						value={this.state.content}
						placeholder="Blog Content Matters"></textarea>
				</div>
				<div className="button">
					<button type="submit">Save</button>
				</div>
			</form>
		);
	}
}
