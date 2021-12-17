import React from "react";
import JobDetail from "./JobDetail";
import { Link } from "react-router-dom";
import JoblyApi from "../api";

function JobCard({
	job: { title, companyName, companyHandle, equity, salary, id },
	applied,
}) {
	const apply = () => {
		JoblyApi.applyToJob(id);
	};

	return (
		<li className="displayCard">
			<h3>{title}</h3>
			{companyName && (
				<h4>
					Company: <Link to={`companies/${companyHandle}`}>{companyName}</Link>
				</h4>
			)}
			<JobDetail salary={salary} equity={equity} />
			{!applied ? (
				<button onClick={apply} className="applyButton">
					Apply
				</button>
			) : (
				<button disabled className="applyButton">
					Applied
				</button>
			)}
		</li>
	);
}

export default JobCard;
