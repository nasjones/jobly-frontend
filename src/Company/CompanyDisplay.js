import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "../Job/JobCard";
import useCheckAuth from "../checkAuth";

function CompanyDisplay() {
	const [company, setCompany] = useState({});
	const params = useParams();

	useEffect(() => {
		async function loadCompany() {
			setCompany(await JoblyApi.getCompany(params.company_id));
		}
		loadCompany();
		return () => {
			setCompany({});
		};
	}, [params]);
	if (!useCheckAuth(true)) return <Redirect to="/login" />;
	if (Object.keys(company).length === 0) return null;

	return (
		<div>
			<h1>{company.name}</h1>
			<span>Number of employees: {company.numEmployees}</span>
			<p>{company.description}</p>
			<h2>Jobs</h2>
			<ul>
				{company.jobs.map((job) => {
					return <JobCard job={job} key={`job-${job.id}`} />;
				})}
			</ul>
		</div>
	);
}

export default CompanyDisplay;
