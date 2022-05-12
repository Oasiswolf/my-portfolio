import React from "react";
import { Link } from "react-router-dom";

export default function BlogItem(props) {
	const { id, blog_status, title, featured_image_url, content } =
		props.blogItem;
	return (
		<div key={id}>
			<div>
				<Link to={`/b-detail/${id}`}>
					<h2>{title}</h2>
				</Link>
				{id},{blog_status}
			</div>
			<div>{content}</div>
			<div>{featured_image_url}</div>
		</div>
	);
}
