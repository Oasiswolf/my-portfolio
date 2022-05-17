import React, { Component } from "react";
import axios from "axios";
import { DropzoneComponent } from "react-dropzone-component";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";

import RTE from "../text-editor/richtexteditor";

export default class BlogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			title: "",
			blog_status: "",
			content: "",
			featured_image: "",
			apiUrl: "https://nathanlamb.devcamp.space/portfolio/portfolio_blogs",
			apiAction: "post",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRTEChange = this.handleRTEChange.bind(this);

		this.componentConfig = this.componentConfig.bind(this);
		this.djsConfig = this.djsConfig.bind(this);
		this.handleBlogImg = this.handleBlogImg.bind(this);

		this.featuredImageRef = React.createRef();
	}

	componentConfig() {
		return {
			iconFiletypes: [".jpg", ".png"],
			showFiletypeIcon: true,
			postUrl: "https://httpbin.org/post",
		};
	}

	djsConfig() {
		return {
			addRemoveLinks: true,
			maxFiles: 1,
		};
	}

	handleBlogImg() {
		return {
			addedfile: (file) => this.setState({ featured_image: file }),
		};
	}

	handleRTEChange(content) {
		this.setState({ content });
	}

	buildForm() {
		let formData = new FormData();

		formData.append("portfolio_blog[title]", this.state.title);
		formData.append("portfolio_blog[blog_status]", this.state.blog_status);
		formData.append("portfolio_blog[content]", this.state.content);

		if (this.state.featured_image) {
			formData.append(
				"portfolio_blog[featured_image]",
				this.state.featured_image
			);
		}

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
				if (this.state.featured_image) {
					this.featuredImageRef.current.dropzone.removeAllFiles();
				}

				this.setState({
					title: "",
					blog_status: "",
					content: "",
					featured_image: "",
				});

				this.props.formSubmit(response.data.portfolio_blog);
			})
			.catch((error) => {
				console.log("Blog Form Submit Error", error);
			});

		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="blog-form-wrap">
				<div>
					<h2>My Personal Blog Uploader</h2>
				</div>
				<div className="two-column">
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
				<div className="content-wrap one-column">
					<RTE rteChange={this.handleRTEChange} />
				</div>
				<div className="img-uploader">
					<DropzoneComponent
						ref={this.featuredImageRef}
						config={this.componentConfig()}
						djsConfig={this.djsConfig()}
						eventHandlers={this.handleBlogImg()}>
						<div className="dz-message">Blog Image</div>
					</DropzoneComponent>
				</div>
				<div className="btn">
					<button type="submit">Save</button>
				</div>
			</form>
		);
	}
}
