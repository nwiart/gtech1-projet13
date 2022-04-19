import React from "react";
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, Modal, Row, Toast } from "react-bootstrap";

import ProductCard from "../components/ProductCard";

import background_top from '../img/product_background_top.png';
import background_bottom from '../img/product_background_bottom.png';

import styles from '../css/Product.module.css';
import { withRouter } from "../withRouter";
import ProductReviewApi from "../api/ProductReviewApi";
import ProductReview from "../components/ProductReview";
import Rating from "../components/Rating";


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

			modalVisible: false,
			showReviewToast: false
		};
	}

	onLeaveReview() {
		ProductReviewApi.leaveReview({id: this.props.user.id}, this.state.productID, 4, "Cool");
		this.setState({modalVisible: false, showReviewToast: true});
	}

	onShowReviewModal() {
		this.setState({modalVisible: true});
	}

	onHideReviewModal() {
		this.setState({modalVisible: false});
	}

	async componentDidMount() {

		// Set a timeout to see the loading screen.
		await setTimeout( async () => {

			// Retrieve product ID from the URL.
			const queryString = await window.location.search;
			const urlParams = await new URLSearchParams(queryString);
			const productID = await urlParams.get("id");

			// Get product.
			const qs = require("qs");
			const querys = qs.stringify(
				{
					populate: {
						shop: {populate: ["*"]},
						pictures: "*",
						region: {populate: ["*"]},
						product_reviews: {
							populate: ["publisher"]
						}
					}
				},
				{
					encodeValuesOnly: true
				}
			);
			let response = await fetch("http://localhost:1337/api/products/" + productID + "?" + querys, {method:"GET", headers: {"Accept": "application/json", "Content-Type": "application/json"}});
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
		const Reviews = (props) => {
			if (props.reviews.length == 0) {
				return "Il n'y a aucun avis sur ce produit pour le moment.";
			}
			else {
				return (
					<Row>
						<p>{props.reviews.length} avis</p>
						{
							props.reviews.map((u, i) => {
								return (
									<Col xs="6">
										<ProductReview
											publisherName={u.attributes.publisher.data.attributes.firstName + " " + u.attributes.publisher.data.attributes.lastName}
											publishDate={u.attributes.createdAt}
											rating={u.attributes.rating}
											comment={u.attributes.comment} />
									</Col>
								);
							})
						}
					</Row>
				);
			}
		};

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
								<Rating rating={this.state.product.notation} />
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
								this.props.user === undefined || this.props.user === null
									? <button className="btn-disabled" disabled>Connectez-vous pour laisser un avis</button>
									: <button onClick={() => this.onShowReviewModal()}>Laisser un avis</button>
							}
							
						</div>
						
						<Reviews reviews={this.state.product.product_reviews.data} />
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



				{ /* Leave a review modal. */ }
				<Modal show={this.state.modalVisible} onHide={() => this.onHideReviewModal()}>
					<Modal.Header>
						<Modal.Title>Laisser un avis</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Choisissez une note ci-dessous et écrivez un commentaire (optionnel) :

						<Form>
							<Form.Group>
								<Form.Label>Note* (sur 5 étoiles)</Form.Label><br/>
								<Form.Check inline label="1" name="stars" type="radio" />
								<Form.Check inline label="2" name="stars" type="radio" />
								<Form.Check inline label="3" name="stars" type="radio" />
								<Form.Check inline label="4" name="stars" type="radio" />
								<Form.Check inline label="5" name="stars" type="radio" />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Commentaire</Form.Label>
								<Form.Control as="textarea" rows={3} />
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => this.onHideReviewModal()}>Annuler</Button>
						<Button variant="primary" onClick={() => this.onLeaveReview()}>Envoyer</Button>
					</Modal.Footer>
				</Modal>

				{ /* Toast message notifying of the review being sent. */ }
				<Toast show={this.state.showReviewToast} style={{position:"fixed", bottom: "1em", right:"1em"}}>
					<Toast.Header>
						<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
						<strong className="me-auto">Avis posté!</strong>
						<small>{this.state.product.name}</small>
					</Toast.Header>
					<Toast.Body>Votre avis a été posté.</Toast.Body>
				</Toast>
			</>
		)
	}
}

export default withRouter(Product);