import React, { Component } from "react";

import PortFolioContainer from "../portfolio-items/portfolio-container";

export default class Home extends Component {
	render() {
		return (
			<div>
				<h1>
					<PortFolioContainer />
				</h1>
			</div>
		);
	}
}
