import React, { useEffect, useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import Search from "../Search";
import useCheckAuth from "../checkAuth";

function CompanyList() {
	const search = useLocation().search;
	const params = new URLSearchParams(search);
	const name = params.get("name");
	const [companies, updateCompanies] = useState([]);

	useEffect(() => {
		async function loadCompanies() {
			updateCompanies(await JoblyApi.getAllCompanies(name));
		}
		loadCompanies();
		return () => {
			updateCompanies([]);
		};
	}, [name]);
	if (!useCheckAuth(true)) return <Redirect to="/login" />;
	return (
		<div>
			<h1>Companies</h1>
			<Search />
			<ul>
				{companies.map((company) => {
					return <CompanyCard company={company} key={company.handle} />;
				})}
			</ul>
		</div>
	);
}
export default CompanyList;
