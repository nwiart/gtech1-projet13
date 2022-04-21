import React from "react";
import { Link } from 'react-router-dom';
import { CarouselItem, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from 'react-bootstrap/Carousel';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ProductCard from "../components/ProductCard";


import calquelogo from "../images/CalqueLogo.png";
import ligne from "../images/Ligne22.png";
import ligne_blanche from "../images/Ligne30.png";
import carte from "../images/carte_de_fronce.png";
import plan2 from "../images/arrierePlan2.png";
import plan_top from "../img/product_background_top.png";
import plan_bottom from '../img/product_background_bottom.png';

import image_footer from "../images/ImageFooter.png";
import boulanger from "../images/devenir-boulang.png";
import boulanger1 from "../images/ImageBoulanger1.png";
import boulanger2 from "../images/ImageBoulanger2.png";
import boulanger3 from "../images/ImageBoulanger3.png";

import background_top from '../img/product_background_top.png';
import background_bottom from '../img/product_background_bottom.png';

import Config from "../api/Config";

class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			carouselImages: [],
			welcomeParagraph: ""
		};
	}

	async componentDidMount() {
		let response = await fetch(Config.dbUrl + "/api/homepage?populate=*", {method:"GET", headers:{"Accept": "application/json", "Content-Type": "application/json"}});
		let json = await response.json();
		
		let imageUrls = [];
		await json.data.attributes.carousel.data.forEach(e => {
			imageUrls.push(Config.dbUrl + e.attributes.url);
		});

		this.setState({
			carouselImages: imageUrls,
			welcomeParagraph: json.data.attributes.welcome_paragraph
		});
	}

	render() {
		return (
			<>
			<Container style={{ background: "white", minHeight: "100vh" }}>
				<p style={{color: "white"}}>ester-egg</p>
				<div className="container">
					<div className="text-center">
						<div className="logoTitre">
							<img src={calquelogo} width="300" style={{"borderRadius": "300px"}} />
						</div>

						<div className="blue">
							<div style={{ display: 'block', padding: 30 }}>
								<Carousel style={{zIndex: 0}}>
									{	
										this.state.carouselImages.map((u, i) => {
											return (
												<Carousel.Item key={i} interval={1500}>
													<img className="d-block w-100" src={u} />
												</Carousel.Item>
											);
										})
									}
								</Carousel>
							</div>
							<img src={ligne}/>
							<div className="text-description">
								<div className="title">
									<h2>Bienvenue sur l'Artisan</h2>
								</div>
								<div className="description">
									<p>{this.state.welcomeParagraph}</p>
								</div>
							</div>
							<img src={ligne}/>
							<div>
								<h2>Découvrez les produit de nos régions</h2>
							</div>
							<img src={carte} width="572" style={{dispaly: "block"}}/>
							<br/>
							<img src={ligne}/>
						</div>
						</div>
						</div>
				</Container>

				<Container style={{ padding: "0" }}>
					<img src={background_top} width="100%" />
				</Container>

				<Container>
						<div>
							<div style={{ display: 'block', padding: 30, textAlign: "center"}}>
								<h3 className="text-center" style={{color: "white", fontStyle: "italic"}}>Nos recommandations produits</h3>
								<br/>
								<img src={ligne_blanche}/>
							</div>
						</div>
						
						<div className="d-flex justify-content-between">
							<ProductCard product={{name: "Produit1", price: 7.99}} />
							<ProductCard product={{name: "Produit2", price: 15.99}} />
							<ProductCard product={{name: "Produit3", price: 8.99}} />
							<ProductCard product={{name: "Produit4", price: 26.49}} />
							<ProductCard product={{name: "Produit5", price: 3.99}} />
						</div>
				</Container>


				

				<div className="recommandation">
					<div className="text-center">
						<div style={{ display: 'block', padding: 30, textAlign: "center"}}>
							<h3 style={{color: "white", fontStyle: "italic"}}>Nos recommandations artisans</h3>
							<br/>
							<img src={ligne_blanche}/>
						</div>
						<div className="CardBackground">
							<Container>
								<Row>
									<Col xs={6}>
														
											<img className="img-fluid" src={boulanger}/>
											<br/>
											<br/>
											<button style={{textAlign: "center", background: "dark_blue", color: "#123d65" }}><Link to={"/artisan?id=2"} style={{color: "white"}}>Voir la page de cet artisan</Link></button>
									</Col>
									<Col xs={6} className="d-flex">
										<Carousel>
											<Carousel.Item>
												<img src={boulanger1} />
											</Carousel.Item>
											<Carousel.Item>
												<img src={boulanger2} />
											</Carousel.Item>
											<Carousel.Item>
												<img src={boulanger3} />
											</Carousel.Item>
										</Carousel>
									</Col>
								</Row>
							</Container>	
						</div>
					</div>
				</div>
				<Container style={{ padding: "0" }}>
					<img src={background_bottom} width="100%" />	
				</Container>
				<div className="end_page">
					<img src={image_footer} width="100%"/>
				</div>
			</>
		);
	};
}

export default Home;