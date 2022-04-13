import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { Container } from 'react-bootstrap';

class Connect extends React.Component {

	constructor(props) {
		super(props);
	}

	async login() {

	}

	async register() {
		let obj = {
			data: {
				firstName: ""
			}
		};

		let request = {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(obj)
		};

		let response = await fetch("http://localhost:1337/api/users/", request);
	}

	onSubmit(event) {
		event.preventDefault();


	}

	onConnectAs(event) {
		event.target.innerHTML = "Se connecter en tant que client";
	}

	render() {
		return (
			<>
				<Header />

				<Container style={{background: "white"}}>
					<form onSubmit={this.onSubmit}>
						<button type="submit">C'est parti</button>
					</form>

					<div className="text-center">
						<button onClick={this.onConnectAs}>Se connecter en tant qu'artisan</button>
					</div>
				</Container>

				<Footer />
			</>
		);
	}
}

export default Connect;