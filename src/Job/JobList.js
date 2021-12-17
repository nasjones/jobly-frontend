import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import Search from "../Search";
import useCheckAuth from "../checkAuth";

function JobList() {
	const [jobs, updateJobs] = useState([]);
	const [applications, updateApplications] = useState([]);
	useEffect(() => {
		async function loadJobs() {
			updateJobs(await JoblyApi.getAllJobs());
			updateApplications(await JoblyApi.getUserApplications());
		}
		loadJobs();
		return () => {
			updateJobs([]);
			updateApplications([]);
		};
	}, []);
	if (!useCheckAuth(true)) return <Redirect to="/login" />;

	return (
		<div>
			<h1>Jobs</h1>
			<Search />
			<ul>
				{jobs.map((job) => {
					return (
						<JobCard
							job={job}
							applied={applications.includes(job.id)}
							key={`job-${job.id}`}
						/>
					);
				})}
			</ul>
		</div>
	);
}
export default JobList;
