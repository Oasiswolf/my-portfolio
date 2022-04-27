import React from "react";
import { Link } from "react-router-dom";

export default function WrongLink() {
	return (
		<div>
			<h1>
				Wrong Link! <br />
				Please Click the Link <br />
				Below to Continue. <br />
				Thanks for your cooperation! <br />
				Management
			</h1>
			<Link to="/">Home</Link>
		</div>
	);
}
