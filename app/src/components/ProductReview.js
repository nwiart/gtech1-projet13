import Rating from "./Rating";

import styles from "../css/ProductReview.module.css";


const ProductReview = (props) => {

	return (
		<div className={styles.productReviewContainer + " mb-1"}>
			<p className={styles.publisherName}>
				{props.publisherName} - <small>{new Date(props.publishDate).toLocaleDateString()}</small>
			</p>

			<Rating ratingOverFive={props.rating} />
			<p>{props.comment}</p>
		</div>
	)
};

export default ProductReview;