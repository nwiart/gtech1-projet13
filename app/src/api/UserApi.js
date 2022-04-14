export default class UserApi {

	static url = "http://localhost:1337";

	/**
	 * Retrieve user info from the database.
	 * @param {object} requiredData - A JSON object containing all values that the returned user(s) should match.
	 */
	static async getUser(requiredData) {

		let reqUrl = UserApi.url + "/api/accounts";
		let i = 0;
		for (let key in requiredData) {
			if (requiredData.hasOwnProperty(key)) {
				reqUrl += ((i == 0) ? "?" : "&") + "filters[" + key + "][$eq]=" + requiredData[key];
			}
			i++;
		}

		let response = await fetch(reqUrl, { method: "GET", headers: { "Accept": "application/json", "Content-Type": "application/json" } });
		let json = await response.json();

		return json;
	}
};