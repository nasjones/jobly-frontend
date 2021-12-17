import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

function Homepage() {
	const { user } = useContext(UserContext);
	return (
		<div>
			<h1>Homepage</h1>
			{!user ? (
				<div className="homeLinks">
					<span>
						new here? <Link to="/signup">Sign up!</Link>
					</span>
					<span>
						returning users <Link to="/login">Login</Link>
					</span>
				</div>
			) : (
				<h2>Welcome {user}</h2>
			)}
		</div>
	);
}

export default Homepage;
