import React, { Component } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement(".app-wrapper");

import BlogForm from "./blog-form";

export default class BlogModal extends Component {
	constructor(props) {
		super(props);

		this.customStyles = {
			content: {
				top: "50%",
				left: "50%",
				right: "auto",
				marginRight: "-50%",
				transform: "translate(-50%, -50%)",
				width: "800px",
				height: "80%",
			},
			overlay: {
				backgroundColor: "rgba(1,1,1,0.75)",
			},
		};

		this.handleGoodSubmit = this.handleGoodSubmit.bind(this);
	}

	handleGoodSubmit(blog) {
		this.props.newBlog(blog);
	}

	render() {
		return (
			<ReactModal
				style={this.customStyles}
				isOpen={this.props.openModal}
				onRequestClose={() => {
					console.log("Modal wants to Close Please!");
					this.props.closeModal();
				}}>
				<BlogForm formSubmit={this.handleGoodSubmit} />
			</ReactModal>
		);
	}
}
