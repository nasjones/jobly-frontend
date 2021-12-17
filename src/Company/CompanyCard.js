import React from "react";
// import "./CompanyCard.css";
import CompanyDetail from "./CompanyDetail";
import { Link } from "react-router-dom";

function CompanyCard({ company: { handle, name, description, numEmployees } }) {
	return (
		<li className="displayCard">
			<h3>
				<Link to={`companies/${handle}`}>{name}</Link>
			</h3>
			<CompanyDetail description={description} numEmployees={numEmployees} />
		</li>
	);
}

export default CompanyCard;
