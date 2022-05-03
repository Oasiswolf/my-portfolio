import React from "react";

export default function PortfolioSidebar(props) {
	const portfolioList = props.data.map((portfolioItem) => {
		return (
			<div key={portfolioItem.id} className="sidebar-items">
				<div className="sidebar-bgimg">
					<img
						src={portfolioItem.thumb_image_url}
						alt="Background Image"
					/>
				</div>
				<h1 className="title">{portfolioItem.name}</h1>
				<h1>{portfolioItem.id}</h1>
			</div>
		);
	});
	return <div className="sidebar-wrapper">{portfolioList}</div>;
}
