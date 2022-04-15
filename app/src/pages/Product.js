import React from "react";
import { Link } from 'react-router-dom';
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";

import star from '../img/star.png';
import star_half from '../img/star_half.png';
import star_empty from '../img/star_empty.png';


class Product extends React.Component {

	// Light blue panel with round corners.
	static Panel = (props) => {
		return (
			<div style={{
				background: "#E6EBF0",
				borderRadius: "16px",
				margin: "16px",
				padding: "32px",
				color: "#123d65" }}>

				{props.children}
			</div>
		);
	};

	constructor(props) {
		super(props);

		this.state = {
			product: undefined,
			shop: undefined
		};
	}

	async componentDidMount() {

		// Set a timeout to see the loading screen.
		await setTimeout( async () => {

			// Retrieve product ID from the URL.
			const queryString = await window.location.search;
			const urlParams = await new URLSearchParams(queryString);
			const productID = await urlParams.get("id");

			// Get product.
			let response = await fetch("http://localhost:1337/api/products/" + productID + "?populate=*", {method:"GET", headers: {"Accept": "application/json", "Content-Type": "application/json"}});
			let json = await response.json();

			// Product does not exist.
			if (json.data === null) {
				this.setState( { product: null } );
				return;
			}

			let product = json.data.attributes;

			// Get associated shop AND artisan.
			let shopID = json.data.attributes.shop.data.id;
			response = await fetch("http://localhost:1337/api/shops/" + shopID + "?populate=*", {method:"GET", headers: {"Accept": "application/json", "Content-Type": "application/json"}});
			json = await response.json();
			let shop = json.data.attributes;

			this.setState( {
				product: product,
				shop: shop
			} );
		}, 2000 );
	}

	render() {

		// Loading.
		if (this.state.product === undefined) {
			return (
				<>
					<Header />

					<Container style={{ background: "white", minHeight: "100vh" }}>
						Chargement...
					</Container>

					<Footer />
				</>
			)
		}

		// Product does not exist.
		if (this.state.product === null) {
			return (
				<>
					<Header />

					<Container style={{ background: "white", minHeight: "100vh" }}>
						Ce produit n'existe pas.
					</Container>

					<Footer />
				</>
			);
		}

		// Found product.
		return (
			<>
				<Header />

				<Container style={{ background: "white" }}>
					<Row>
						<Col xs={6}>
							
						</Col>

						<Col xs={6}>
							<Product.Panel>
								{ /* Product name, notation, description and price. */ }
								<h2>{this.state.product.name}</h2>
								<img width="16" height="16" src={this.state.product.notation == 1 ? star_half : (this.state.product.notation >= 2  ? star : star_empty)} />
								<img width="16" height="16" src={this.state.product.notation == 3 ? star_half : (this.state.product.notation >= 4  ? star : star_empty)} />
								<img width="16" height="16" src={this.state.product.notation == 5 ? star_half : (this.state.product.notation >= 6  ? star : star_empty)} />
								<img width="16" height="16" src={this.state.product.notation == 7 ? star_half : (this.state.product.notation >= 8  ? star : star_empty)} />
								<img width="16" height="16" src={this.state.product.notation == 9 ? star_half : (this.state.product.notation == 10 ? star : star_empty)} />
								<p>{this.state.product.description}</p>

								<p style={{fontSize: "3em", fontWeight: "bold"}}>{this.state.product.price}€</p>

								<div style={{textAlign: "center"}}><button style={{ background: "white", color: "#123d65" }}>Ajouter au panier</button></div>
							</Product.Panel>
						</Col>
					</Row>

					<Product.Panel>
						<Row>
							<Col xs={4}>

							</Col>

							<Col xs={8}>
								<h2>{this.state.shop.name}</h2>
								<p>{this.state.shop.description}</p>

								<Link to="/product">Voir la page de cet artisan</Link>
							</Col>
						</Row>
					</Product.Panel>

					<Product.Panel>
						<h2>Avis</h2>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto hic reiciendis eius. Impedit voluptate nihil et accusamus non, reprehenderit eius. Vitae, perspiciatis praesentium sint mollitia beatae reprehenderit. Pariatur, aspernatur repudiandae.</p>
					</Product.Panel>
				</Container>

				<Footer />
			</>
		)
	}
}

export default Product;