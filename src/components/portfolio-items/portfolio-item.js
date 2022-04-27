import React from "react";
import { Link } from "react-router-dom";

export default function portfolio_item(props) {
	const { id, description, thumb_image_url, logo_url } = props.item;
	// needed Data: bgImg, logo, description, id

	return (
		<div>
			<div>
				<img src={thumb_image_url} alt="bgImg" />
			</div>

			<div>
				<img src={logo_url} alt="Logo" />
			</div>

			<div>
				<h3>{description}</h3>
			</div>

			<Link to={`/detail/${id}`}>Link</Link>
		</div>
	);
}
