import React from "react";
import { Container } from "react-bootstrap";
import Rating from "../components/Rating";

class Artisan extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			artisan: undefined
		};
	}

async componentDidMount(){
	// Retrieve product ID from the URL.
	const queryString = await window.location.search;
	const urlParams = await new URLSearchParams(queryString);
	const artisanID = await urlParams.get("id");

	let response = await fetch("http://localhost:1337/api/artisans/" + artisanID + "?populate=*", {method:"GET", headers:{"Accept": "application/json", "Content-Type": "apllication/json"}});
	let json = await response.json();

	this.setState({artisan: json.data.attributes});
}

	render() {

		if (this.state.artisan === undefined) {
			return (
				<>
				</>
			);
		}

		return (
			<>
				<Container style={{background: "white"}}>
					<h2>Nom de la boutique</h2>
					<Rating rating="8" />

					<Container>
					<p className="text-center">{this.state.artisan.shop.data.attributes.description}</p>
					</Container>

					<h2>Liste des produits</h2>

				</Container>
			</>
		);
	}
}

export default Artisan;