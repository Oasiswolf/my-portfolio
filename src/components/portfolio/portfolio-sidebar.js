import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faFileEdit } from "@fortawesome/free-solid-svg-icons";

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
				<div className="text-icon">
					<div className="title">{portfolioItem.name}</div>
					<a onClick={() => props.edit(portfolioItem)}>
						<FontAwesomeIcon icon={faFileEdit} />
					</a>
					<a onClick={() => props.deleteClick(portfolioItem)}>
						<FontAwesomeIcon icon={faTrashAlt} />
					</a>
				</div>
			</div>
		);
	});
	return <div className="sidebar-wrapper">{portfolioList}</div>;
}
