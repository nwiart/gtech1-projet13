import Config from "./Config";

import axios from 'axios';

export default class UserApi {

	static async createUser(data) {

		let accountID = await UserApi._createAccount(data.firstName, data.lastName, data.phoneNumber);
		await UserApi._createStrapiUser(data.email, data.email, data.password, accountID);
	}

	/**
	 * Retrieve user info from the database.
	 */
	static async getUser(email, password) {

		let res = await UserApi._getStrapiUser(email, password);
		if (res.result == "error") {
			return undefined;
		}

		let strapiUser = res.data.user;
		let account = await UserApi._getAccount(strapiUser.account_id);

		return {
			id: strapiUser.account_id,
			firstName: account.firstName,
			lastName: account.lastName,
			email: strapiUser.email,
			isArtisan: false
		};
	}

	

	static async _createAccount(firstName, lastName, phoneNumber) {

		// Create our account.
		let accountObj = { data: {
			firstName: firstName,
			lastName: lastName,
			phoneNumber: phoneNumber
		} };

		let request = { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(accountObj) };
		let response = await fetch(Config.dbUrl + "/api/accounts", request);
		let json = await response.json();
		let accountID = await json.data.id;

		return accountID;
	}

	static async _getAccount(id) {

		let request = { method: "GET", headers: { "Accept": "application/json", "Content-Type": "application/json" } };
		let response = await fetch(Config.dbUrl + "/api/accounts/" + id, request);
		let json = await response.json();
		return json.data.attributes;
	}

	static async _createStrapiUser(username, email, password, accountID) {

		// Create Strapi user after the actual account.
		await axios.post(Config.dbUrl + "/api/auth/local/register", {
			username: username,
			email: email,
			password: password,
			account_id: accountID
		}).then(() => {

		}).catch((error) => {
			console.log('An error occurred:', error.response);
		});
	}

	static async _getStrapiUser(email, password) {

		let res = undefined;

		await axios.post(Config.dbUrl + "/api/auth/local", {
			identifier: email,
			password: password

			// Login successful.
		}).then((response) => {
			res = {result: "success", data: response.data};
			console.log(res.data);

			// Login failed.
		}).catch((error) => {
			res = {result: "error", data: error.response};
		});

		return res;
	}
};