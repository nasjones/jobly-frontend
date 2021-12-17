import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./Company/CompanyList";
import CompanyDisplay from "./Company/CompanyDisplay";
import JobList from "./Job/JobList";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

function Routes() {
	return (
		<div>
			<Switch>
				<Route exact path={"/"}>
					<Homepage />
				</Route>
				<Route exact path={"/companies"}>
					<CompanyList />
				</Route>
				<Route exact path={"/companies/:company_id"}>
					<CompanyDisplay />
				</Route>
				<Route exact path={"/jobs"}>
					<JobList />
				</Route>
				<Route exact path={"/login"}>
					<Login />
				</Route>
				<Route exact path={"/signup"}>
					<Signup />
				</Route>
				<Route exact path={"/profile"}>
					<Profile />
				</Route>
				<Route></Route>
			</Switch>
		</div>
	);
}

export default Routes;
