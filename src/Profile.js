import React, { useEffect, useState } from "react";
import useCheckAuth from "./checkAuth";
import { Redirect } from "react-router-dom";
import JoblyApi from "./api";

function Profile() {
	const [formValues, updateValues] = useState(null);
	useEffect(() => {
		const getInfo = async () => {
			updateValues(await JoblyApi.getUserInfo());
		};
		getInfo();
		return () => {
			updateValues(null);
		};
	}, []);

	const handleChange = (evt) => {
		const { name, value } = evt.target;

		updateValues((oldValues) => {
			return { ...oldValues, [name]: value };
		});
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			await JoblyApi.updateUser(formValues);
		} catch {
			alert("problem updating info");
		}
	};
	if (!useCheckAuth(true)) return <Redirect to="/login" />;
	if (!formValues) return null;
	return (
		<div>
			<h1>Profile page</h1>
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
					defaultValue={formValues.firstName}
					maxLength="30"
					required
				/>

				<label htmlFor="lastName">Last Name</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					autoComplete="Last Name"
					defaultValue={formValues.lastName}
					maxLength="30"
					required
				/>

				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					autoComplete="email"
					defaultValue={formValues.email}
					minLength="6"
					maxLength="60"
					required
				/>
				<label htmlFor="password">New Password:</label>
				<span>
					This field is not required if you wish to leave your password the
					same.
				</span>
				<input
					type="password"
					id="password"
					name="password"
					autoComplete="new-password"
					minLength="5"
					maxLength="20"
				/>
				<button type="submit" className="userSubmit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default Profile;
