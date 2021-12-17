import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	// the token for interactive with the API will be stored here.
	static token = window.sessionStorage.token;

	static setToken(token) {
		this.token = token;
	}

	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${this.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	/** Get details on a company by handle. */

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	// obviously, you'll add a lot here ...
	static async getAllCompanies(
		name = "",
		minEmployees = "",
		maxEmployees = ""
	) {
		let query = "";
		if (name) query += "name=" + name;
		if (minEmployees) query += "minEmployees" + minEmployees;
		if (maxEmployees) query += "maxEmployees" + maxEmployees;

		let res = await this.request(`companies?${query}`);
		return res.companies;
	}

	static async getAllJobs() {
		let res = await this.request("jobs");
		return res.jobs;
	}

	static async login(user) {
		let res = await this.request("auth/token", user, "post");
		console.log(res);
		this.addUserToSession(user.username, res.token);
		return user.username;
	}

	static async signup(newUser) {
		let res = await this.request("auth/register", newUser, "post");
		this.addUserToSession(newUser.username, res.token);
		return newUser.username;
	}

	static async logout() {
		this.setToken(null);
		window.sessionStorage.clear();
	}

	static async getUserInfo() {
		let res = await this.request(`users/${window.sessionStorage.user}`);
		let user = res.user;
		delete user.applications;
		delete user.isAdmin;
		return res.user;
	}

	static async getUserApplications() {
		let res = await this.request(`users/${window.sessionStorage.user}`);
		return res.user.applications;
	}

	static async updateUser(user) {
		const { username, ...info } = user;
		if (user.password === "") delete user.password;
		await this.request(`users/${username}`, info, "patch");
	}

	static async applyToJob(jobId) {
		console.log(jobId);
		let res = await this.request(
			`users/${window.sessionStorage.user}/jobs/${jobId}`,
			{},
			"post"
		);
		console.log(res);
	}

	static addUserToSession(username, token, jobs = []) {
		window.sessionStorage.setItem("user", username);
		window.sessionStorage.setItem("jobs", jobs);
		window.sessionStorage.setItem("token", token);
		this.setToken(token);
	}
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
// 	"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
// 	"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
