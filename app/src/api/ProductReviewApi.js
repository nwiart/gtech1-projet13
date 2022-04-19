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

		let request = {
			method: "POST",
			headers: { "Accept": "apllication/json", "Content-Type": "application/json" },
			body: JSON.stringify(obj)
		};

		let response = await fetch(Config.dbUrl + "/api/product-reviews", request);
	}
}

export default ProductReviewApi;