import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";
import UserContext from "./UserContext";
import JoblyApi from "./api";

function NavBar() {
	const { user, setUser } = useContext(UserContext);
	const history = useHistory();
	const handleLogout = async () => {
		await JoblyApi.logout();
		setUser(null);
		history.push("/");
	};
	return (
		<div id="navBar">
			<div id="mainNav">
				<NavLink to="/">Jobly</NavLink>
			</div>
			<div id="navLinks">
				<NavLink to="/companies">companies</NavLink>
				<NavLink to="/jobs">jobs</NavLink>
				{!user
					? [
							<NavLink to="/login" key="nav-login">
								login
							</NavLink>,
							<NavLink to="/signup" key="nav-signup">
								signup
							</NavLink>,
					  ]
					: [
							<NavLink to="/profile" key="user-profile">
								profile
							</NavLink>,
							<button key="logout" onClick={handleLogout}>
								logout
							</button>,
					  ]}
			</div>
		</div>
	);
}

export default NavBar;
