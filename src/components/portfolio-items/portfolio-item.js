import React from "react";

export default function portfolio_item(props) {
	return (
		<div>
			<h3>{props.title}</h3>
			<h3>{props.url}</h3>
		</div>
	);
}
