import React from "react";
import { Link } from 'react-router-dom';
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from 'react-bootstrap/Carousel';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import calquelogo from "../images/CalqueLogo.png";
import ligne from "../images/Ligne22.png";
import ligne_blanche from "../images/Ligne30.png";
import carte from "../images/carte_de_fronce.png";
import plan1 from "../images/arrierePlan1.png";
import plan2 from "../images/arrierePlan2.png";
import image_footer from "../images/ImageFooter.png";
import boulanger from "../images/devenir-boulang.png";
import boulanger1 from "../images/ImageBoulanger1.png";
import boulanger2 from "../images/ImageBoulanger2.png";
import boulanger3 from "../images/ImageBoulanger3.png";

import carousel1 from "../images/carousel1.png";
import carousel2 from "../images/carousel2.png";
import carousel3 from "../images/carousel3.png";



	const handleDragStart = (e) => e.preventDefault();

	const items = [
	<img src="boulanger1" onDragStart={handleDragStart} />,
	<img src="boulanger2" onDragStart={handleDragStart} />,
	<img src="boulanger3" onDragStart={handleDragStart} />,
	];	

export default class Home extends React.Component {



	render() {

		return (
			<>
				<Header/>
				<Container style={{ background: "white", minHeight: "100vh" }}>
				<div class="container">
					<div className="text-center">
						<div className="logoTitre">
							<img src={calquelogo} width="300" style={{"borderRadius": "300px"}} />
						</div>

						<div className="blue">
							<div style={{ display: 'block', width: 700, padding: 30 }}>
								<Carousel>
									<Carousel.Item interval={1500}>
										<img className="d-block w-100" src={carousel1} alt="Image One"/>
									</Carousel.Item>
									<Carousel.Item interval={1500}>
										<img className="d-block w-100" src={carousel2} alt="Image Two"/>
									</Carousel.Item>
									<Carousel.Item interval={1500}>
										<img className="d-block w-100" src={carousel3} alt="Image Three"/>
									</Carousel.Item>
								</Carousel>
							</div>
							<img src={ligne}/>
							<div className="text-description">
								<div className="title">
									<h2>Bienvenu sur l'Artisan</h2>
								</div>
								<div className="description">
									<p>Le premier site de e-commerce te permettant de te procurer des produits locaux réalisés par des artisans Français!
									Nos partenaires produisent de la nourriture, des boissons, des meubles, des vêtements ou encore tout ce qu'il faut en maroquinerie.
									Saucissons, fromages, paniers cadeaux ou encore du parfum artisanal, tu trouveras ton bonheur parmi tout nos produits!
									</p>
								</div>
							</div>
							<img src={ligne}/>
							<div>
								<h2>Découvrez les produit de nos régions</h2>
							</div>
							<img src={carte} width="572"/>

							<img src={ligne}/>
							<img src={plan1} width="1138"/>
						</div>
						<div>
							<h3>Nos recommandations produits</h3>
						</div>
						<img src={ligne_blanche}/>

						
						<img src={ligne_blanche}/>
						<img src={plan1} width="1138"/>
						<img src={plan2} width="1138"/>
						<div>
							<h3>Nos recommandations artisans</h3>
						</div>
						<Container style={{ background: "white", padding: "12px" }}>
							<Col xs={6}>

								<img className="img-fluid" src={boulanger} />
								<AliceCarousel mouseTracking items={items} />
							</Col>
						</Container>
					</div>
				</div>
				</Container>
				<Footer />
				<div className="end_page">
				<img src={image_footer} width="100%"/>
				</div>
			</>
		);
	}
}
