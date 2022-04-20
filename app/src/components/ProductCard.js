import styles from "../css/ProductCard.module.css";

const ProductCard = (props) => {

	return (
		<div className={styles.productCardBackground}>
			<p>{props.product.name}</p>

			<div className="d-flex text-center">
				<p style={{ fontSize: "2em" }}>{props.product.price}€</p>
				<button>Ajouter</button>
			</div>
		</div>
	);
};

export default ProductCard;