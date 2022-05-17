import React from "react";

const BlogImg = (props) => {
	if (!props.img) {
		return null;
	}

	return (
		<div className="blog-img">
			<img src={props.img} />
		</div>
	);
};

export default BlogImg;
