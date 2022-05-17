import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import striptags from "striptags";

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
			<div>
				<Truncate
					lines={5}
					ellipsis={
						<span>
							...<Link to={`/b-detail/${id}`}>Read More</Link>
						</span>
					}>
					{striptags(content)}
				</Truncate>
			</div>
			<div>{featured_image_url}</div>
		</div>
	);
}
