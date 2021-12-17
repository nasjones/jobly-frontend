import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import useCheckAuth from "./checkAuth";

function Login() {
	const [formValues, updateValues] = useState({
		username: "nas",
		password: "password",
	});
	const history = useHistory();
	const { setUser } = useContext(UserContext);

	const handleChange = (evt) => {
		const { name, value } = evt.target;

		updateValues((oldValues) => {
			return { ...oldValues, [name]: value };
		});
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const username = await JoblyApi.login(formValues);
			setUser(username);
			history.push("/");
		} catch {
			alert("problem logging in");
		}
	};
	if (!useCheckAuth(false)) return <Redirect to="/" />;
	return (
		<div>
			<h1>Login </h1>
			<form
				className="userForm"
				onChange={handleChange}
				onSubmit={handleSubmit}
			>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					name="username"
					autoComplete="current-username"
					defaultValue={"nas"}
					required
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					autoComplete="current-password"
					defaultValue={"password"}
					required
				/>
				<button type="submit" className="userSubmit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default Login;
