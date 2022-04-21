import Config from "./Config";

class ProductReviewApi {

	/**
	 * Leave a review on a product.
	 * @param {object} user - User info object.
	 * @param {integer} productID - The ID of the reviewed product.
	 * @param {integer} rating - Rating between 1 and 5.
	 * @param {string} comment - Optional comment leaved with the rating.
	 */
	static async leaveReview(user, productID, rating, comment = "") {

		let obj = {
			data: {
				publisher: user.id,
				product: productID,
				rating: rating,
				comment: comment
			}
		};

		let request = { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(obj) };

		let response = await fetch(Config.dbUrl + "/api/product-reviews", request);
	}

	static async getReviews(productID) {

		let url = Config.dbUrl + "/api/products/" + productID + "?populate=*";
		let request = { method: "GET", headers: { "Accept": "application/json", "Content-Type": "application/json" } };

		let response = await fetch(url, request);
		let json = await response.json();

		return json.data.attributes.product_reviews;
	}
}

export default ProductReviewApi;