import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import JoblyApi from "./api";

function Signup() {
	const [formValues, updateValues] = useState({});
	const history = useHistory();

	const handleChange = (evt) => {
		const { name, value } = evt.target;

		updateValues((oldValues) => {
			return { ...oldValues, [name]: value };
		});
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			await JoblyApi.signup(formValues);
			history.push("/");
		} catch {
			alert("problem creating user");
		}
	};

	return (
		<div>
			<h1>Signup</h1>
			<form
				className="userForm"
				onChange={handleChange}
				onSubmit={handleSubmit}
			>
				<label htmlFor="firstName">First Name</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					autoComplete="First Name"
					maxLength="30"
					required
				/>

				<label htmlFor="lastName">Last Name</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					autoComplete="Last Name"
					maxLength="30"
					required
				/>

				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					autoComplete="email"
					minLength="6"
					maxLength="60"
					required
				/>

				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					name="username"
					autoComplete="current-username"
					maxLength="30"
					required
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					autoComplete="new-password"
					minLength="5"
					maxLength="20"
					required
				/>
				<button type="submit" className="userSubmit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default Signup;
