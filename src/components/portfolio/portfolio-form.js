import axios from "axios";
import React, { Component } from "react";
import { DropzoneComponent } from "react-dropzone-component";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumpsterFire } from "@fortawesome/free-solid-svg-icons";

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
			editMode: false,
			apiUrl: "https://nathanlamb.devcamp.space/portfolio/portfolio_items",
			apiAction: "post",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.componentConfig = this.componentConfig.bind(this);
		this.djsConfig = this.djsConfig.bind(this);
		this.handleThumbDrop = this.handleThumbDrop.bind(this);
		this.handleBannerDrop = this.handleBannerDrop.bind(this);
		this.handleLogoDrop = this.handleLogoDrop.bind(this);

		this.thumbRef = React.createRef();
		this.bannerRef = React.createRef();
		this.logoRef = React.createRef();
		this.deleteImg = this.deleteImg.bind(this);
	}

	deleteImg(imageType) {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
				{ withCredentials: true }
			)
			.then((response) => {
				this.setState({
					[`${imageType}_url`]: "",
				});
			})
			.catch((error) => {
				console.log("Error Deleting Image", error);
			});
	}

	componentDidUpdate() {
		if (Object.keys(this.props.portEdit).length > 0) {
			const {
				id,
				name,
				description,
				category,
				position,
				url,
				thumb_image_url,
				banner_image_url,
				logo_url,
			} = this.props.portEdit;

			this.props.clear();

			this.setState({
				id: id,
				name: name || "",
				description: description || "",
				url: url || "",
				category: category || "Projects",
				position: position || "",
				editMode: true,
				apiUrl: `https://nathanlamb.devcamp.space/portfolio/portfolio_items/${id}`,
				apiAction: "patch",
				thumb_image_url: thumb_image_url || "",
				banner_image_url: banner_image_url || "",
				logo_url: logo_url || "",
			});
		}
	}

	handleThumbDrop() {
		return {
			addedfile: (file) => this.setState({ thumb_image: file }),
		};
	}
	handleBannerDrop() {
		return {
			addedfile: (file) => this.setState({ banner_image: file }),
		};
	}
	handleLogoDrop() {
		return {
			addedfile: (file) => this.setState({ logo: file }),
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
		if (this.state.banner_image) {
			formData.append(
				"portfolio_item[banner_image]",
				this.state.banner_image
			);
		}
		if (this.state.logo) {
			formData.append("portfolio_item[logo]", this.state.logo);
		}

		return formData;
	}

	handleSubmit(event) {
		// https://nathanlamb.devcamp.space/portfolio/portfolio_items
		axios({
			method: this.state.apiAction,
			url: this.state.apiUrl,
			data: this.buildForm(),
			withCredentials: true,
		})
			.then((response) => {
				if (this.state.editMode) {
					this.props.editSubmit();
				} else {
					this.props.goodSubmit(response.data.portfolio_item);
				}

				console.log("On Good Submit", response);

				this.setState({
					name: "",
					description: "",
					category: "eCommerce",
					position: "",
					url: "",
					thumb_image: "",
					banner_image: "",
					logo: "",
				});

				[this.thumbRef, this.bannerRef, this.logoRef].forEach((ref) => {
					ref.current.dropzone.removeAllFiles();
				});
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
			<form className="portfolio-form" onSubmit={this.handleSubmit}>
				<h3>PortfolioForm</h3>
				<div className="two-column">
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
				<div className="two-column">
					<input
						type="text"
						name="position"
						placeholder="Portfolio Position"
						value={this.state.position}
						onChange={this.handleChange}
					/>
					<select
						className="select-area"
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
					{this.state.thumb_image_url && this.state.editMode ? (
						<div className="dzImgWrap">
							<img src={this.state.thumb_image_url} />
							<div>
								<a
									onClick={() =>
										this.deleteImg("thumb_image")
									}>
									<FontAwesomeIcon icon={faDumpsterFire} />
								</a>
							</div>
						</div>
					) : (
						<DropzoneComponent
							ref={this.thumbRef}
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							name="thumb_image"
							eventHandlers={this.handleThumbDrop()}>
							<div className="dz-message">Thumb Img</div>
						</DropzoneComponent>
					)}
					{this.state.banner_image_url && this.state.editMode ? (
						<div className="dzImgWrap">
							<img src={this.state.banner_image_url} />
							<div>
								<a
									onClick={() =>
										this.deleteImg("banner_image")
									}>
									<FontAwesomeIcon icon={faDumpsterFire} />
								</a>
							</div>
						</div>
					) : (
						<DropzoneComponent
							ref={this.bannerRef}
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							name="banner_image"
							eventHandlers={this.handleBannerDrop()}>
							<div className="dz-message">Banner Img</div>
						</DropzoneComponent>
					)}
					{this.state.logo_url && this.state.editMode ? (
						<div className="dzImgWrap">
							<img src={this.state.logo_url} />
							<div>
								<a onClick={() => this.deleteImg("logo")}>
									<FontAwesomeIcon icon={faDumpsterFire} />
								</a>
							</div>
						</div>
					) : (
						<DropzoneComponent
							ref={this.logoRef}
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							name="logo"
							eventHandlers={this.handleLogoDrop()}>
							<div className="dz-message">Logo Img</div>
						</DropzoneComponent>
					)}
				</div>
				<div>
					<button className="btn" type="submit">
						Submit
					</button>
				</div>
			</form>
		);
	}
}
