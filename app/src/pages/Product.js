import React from "react";
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";

import star from '../img/star.png';
import star_half from '../img/star_half.png';
import star_empty from '../img/star_empty.png';
import ProductCard from "../components/ProductCard";

import background_top from '../img/product_background_top.png';
import background_bottom from '../img/product_background_bottom.png';

import styles from '../css/Product.module.css';
import { withRouter } from "../withRouter";
import ProductReviewApi from "../api/ProductReviewApi";


class Product extends React.Component {

	// Light blue panel with round corners.
	static Panel = (props) => {
		return (
			<div className={styles.productInfoPanel}>
				{props.children}
			</div>
		);
	};

	constructor(props) {
		super(props);

		this.state = {
			product: undefined,
			shop: undefined,

			modalVisible: false
		};
	}

	onLeaveReview() {
		if (this.props.user === undefined) {
			//this.props.navigate("/connect");
			
		}
		else {
			this.setState({modalVisible: true});
		}
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

			await this.setState( {
				product: product,
				productID: productID,
				shop: shop
			} );
		}, 500 );
	}

	render() {

		// Loading.
		if (this.state.product === undefined) {
			return (
				<>
					<Container style={{ background: "white", minHeight: "100vh" }}>
						Chargement...
					</Container>
				</>
			)
		}

		// Product does not exist.
		if (this.state.product === null) {
			return (
				<>
					<Container style={{ background: "white", minHeight: "100vh" }}>
						Ce produit n'existe pas.
					</Container>
				</>
			);
		}

		// Found product.
		return (
			<>
				<Container style={{ background: "white", padding: "12px" }}>
					<Row>
						<Col xs={6}>
							<img className="img-fluid" src={"http://localhost:1337" + this.state.product.pictures.data[0].attributes.url} />

							<Product.Panel>
								<h2>Caractéristiques</h2>
								<p>
									Poids : <br/>
									Région : {this.state.product.region.data.attributes.name}<br/>
									Département : {this.state.product.department}<br/>
									Ville : {this.state.product.city}
								</p>
							</Product.Panel>
						</Col>

						<Col xs={6} className="d-flex">
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
						<div className="d-flex">
							<h2 style={{flex: "1"}}>Avis</h2>

							{
								this.props.user === undefined
									? <button onClick={() => this.onLeaveReview()} className="btn-disabled" disabled>Connectez-vous pour laisser un avis</button>
									: <button onClick={() => this.onLeaveReview()}>Laisser un avis</button>
							}
							
						</div>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto hic reiciendis eius. Impedit voluptate nihil et accusamus non, reprehenderit eius. Vitae, perspiciatis praesentium sint mollitia beatae reprehenderit. Pariatur, aspernatur repudiandae.</p>
					</Product.Panel>
				</Container>

				<Container style={{ padding: "0" }}>
					<img src={background_top} width="100%" />
				</Container>

				<Container>
					<h2 style={{color: "white", fontStyle: "italic"}}>Cet artisan propose aussi :</h2>

					<div className="d-flex justify-content-between">
						<ProductCard product={this.state.product} />
						<ProductCard product={this.state.product} />
						<ProductCard product={this.state.product} />
						<ProductCard product={this.state.product} />
						<ProductCard product={this.state.product} />
					</div>
				</Container>

				<Container style={{ padding: "0" }}>
					<img src={background_bottom} width="100%" />
				</Container>



				<Modal show={this.state.modalVisible}>
					<Modal.Header>
						<Modal.Title>Laisser un avis</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Choisissez une note ci-dessous et écrivez un commentaire (optionnel) :
						<Form>
							
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary">Annuler</Button>
						<Button variant="primary" onClick={() => {ProductReviewApi.leaveReview({id: this.props.user.id}, this.state.productID, 4, "Cool");}}>Envoyer</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default withRouter(Product);