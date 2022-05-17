import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { resolve } from "path";
import { rejects } from "assert";

export default class RichTextEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editorState: EditorState.createEmpty(),
		};

		this.onRTEChange = this.onRTEChange.bind(this);
		this.getBase64 = this.getBase64.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
	}

	onRTEChange(editorState) {
		this.setState(
			{ editorState },
			this.props.rteChange(
				draftToHtml(
					convertToRaw(this.state.editorState.getCurrentContent())
				)
			)
		);
	}

	getBase64(file, callback) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => callback(reader.result);
		reader.onerror = (error) => {
			console.log("Base64 Load Error", error);
		};
	}

	uploadFile(file) {
		console.log("Upload File inLine:", file);
		return new Promise((resolve, reject) => {
			this.getBase64(file, (data) => resolve({ data: { link: data } }));
		});
	}

	render() {
		return (
			<div>
				<Editor
					editorState={this.state.editorState}
					wrapperClassName="demo-wrapper"
					editorClassName="demo-editor"
					onEditorStateChange={this.onRTEChange}
					toolbar={{
						inline: { inDropdowwn: true },
						list: { inDropdown: true },
						textAlign: { inDropdown: true },
						link: { inDropdown: true },
						history: { inDropdown: true },
						image: {
							uploadCallback: this.uploadFile,
							alt: { present: true, mandatory: false },
							previewImage: true,
							inputAccept:
								"image/gif,image/jpeg,image/jpg,image/png,image/svg",
						},
					}}
				/>
			</div>
		);
	}
}
