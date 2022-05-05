import axios from "axios";
import React, { Component } from "react";
import { DropzoneComponent } from "react-dropzone-component";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";

export default class PortfolioForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: "",
			url: "",
			category: "Projects",
			position: "",
			thumb_image: "",
			banner_image: "",
			logo: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.componentConfig = this.componentConfig.bind(this);
		this.djsConfig = this.djsConfig.bind(this);
		this.handleThumbDrop = this.handleThumbDrop.bind(this);
	}

	handleThumbDrop() {
		return {
			addedfile: (file) => this.setState({ thumb_image: file }),
		};
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

	buildForm() {
		let formData = new FormData();

		formData.append("portfolio_item[name]", this.state.name);
		formData.append("portfolio_item[description]", this.state.description);
		formData.append("portfolio_item[url]", this.state.url);
		formData.append("portfolio_item[category]", this.state.category);
		formData.append("portfolio_item[position]", this.state.position);

		if (this.state.thumb_image) {
			formData.append(
				"portfolio_item[thumb_image]",
				this.state.thumb_image
			);
		}

		return formData;
	}

	handleSubmit(event) {
		// https://nathanlamb.devcamp.space/portfolio/portfolio_items
		axios
			.post(
				"https://nathanlamb.devcamp.space/portfolio/portfolio_items",
				this.buildForm(),
				{ withCredentials: true }
			)
			.then((response) => {
				this.props.goodSubmit(response.data.portfolio_item);
				console.log("On Good Submit", response);
			})
			.catch((error) => console.log("HandleFormSend Error", error));
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	render() {
		return (
			<div className="portfolio-form-container">
				<h3>PortfolioForm</h3>
				<form className="portfolio-form" onSubmit={this.handleSubmit}>
					<div>
						<input
							type="text"
							name="name"
							placeholder="Portfolio Name"
							value={this.state.name}
							onChange={this.handleChange}
						/>
						<input
							type="text"
							name="url"
							placeholder="Portfolio URL"
							value={this.state.url}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<input
							type="text"
							name="position"
							placeholder="Portfolio Position"
							value={this.state.position}
							onChange={this.handleChange}
						/>
						<select
							name="category"
							value={this.state.category}
							onChange={this.handleChange}>
							<option value="Projects">Projects</option>
							<option value="Fun-Pages">Fun Pages</option>
							<option value="Future-Endeavors">
								Future Endeavors
							</option>
						</select>
					</div>
					<div>
						<textarea
							name="description"
							placeholder="Portfolio Description"
							value={this.state.description}
							onChange={this.handleChange}
						/>
					</div>
					<div className="img-uploader">
						<DropzoneComponent
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							name="thumb_image"
							eventHandlers={this.handleThumbDrop()}
						/>
						<DropzoneComponent
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
						/>
						<DropzoneComponent
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
						/>
					</div>
					<div>
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>
		);
	}
}
