
const ProductCard = (props) => {

	return (
		<div style={{ display: "inline-block", background: "white", borderRadius: "16px", padding: "1em", boxShadow: "#00000050 10px 20px 10px" }}>
			<p>{props.product.name}</p>

			<div className="d-flex text-center">
				<p style={{ fontSize: "2em" }}>{props.product.price}€</p>
				<button>Ajouter</button>
			</div>
		</div>
	);
};

export default ProductCard;