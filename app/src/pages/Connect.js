import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { Container, Form } from 'react-bootstrap';
import Tabs from "../components/Tabs";

import $ from 'jquery';

class Connect extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirm: "",
			isArtisan: false
		};
	}

	async login() {
		let request = {
			method: "GET",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		};

		// Retrieve the corresponding user from the database.
		let response = await fetch("http://localhost:1337/api/accounts?filters[email][$eq]=" + this.state.email, request)
		let json = await response.json();

		// If it's empty, this means no matching user was found.
		if (json.data.length != 1) {
			$("#invalid-email-or-password").css("display", "inline");
		}
		else {
			$("#invalid-email-or-password").css("display", "none");
		}
	}

	// Register a new user in the database.
	// User data is retrieved from "this.state".
	async register() {
		let obj = {
			data: {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
				isArtisan: false
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

		let response = await fetch("http://localhost:1337/api/accounts/", request)
		.then((json) => {
			json.status();
		});
	}

	//
	// Form button callbacks.
	//
	onLoginSubmit(event) {
		event.preventDefault();

		this.login();
	}
	onRegisterSubmit(event) {
		event.preventDefault();

		this.register();
	}

	render() {
		return (
			<>
				<Header />

				<Container style={{background: "white"}}>
					<Tabs defaultTab="#sign-in">
						<div className="tab-navbar">
							<Tabs.TabButton target="#sign-in">Se connecter</Tabs.TabButton>
							<Tabs.TabButton target="#sign-up">S'inscrire</Tabs.TabButton>
						</div>

						{ /* Sign in tab. */ }
						<div className="tab" id="sign-in">
							<p className="text-danger" id="invalid-email-or-password" style={{display: "none"}}>Email ou mot de passe incorrect.</p>
							<Form onSubmit={ (event) => this.onLoginSubmit(event) }>
								<Form.Group controlId="email">
									<Form.Label>Email ou numéro de portable*</Form.Label>
									<Form.Control type="email" onChange={ (e) => this.setState({email: e.target.value}) } />
								</Form.Group>

								<Form.Group controlId="password">
									<Form.Label>Mot de passe*</Form.Label>
									<Form.Control type="password" onChange={ (e) => this.setState({password: e.target.value}) } />
								</Form.Group>

								<Form.Group controlId="rememberMe">
									<Form.Check label="Se souvenir de moi" />
								</Form.Group>

								<div className="text-center"><button type="submit">C'est parti</button></div>
							</Form>
						</div>

						{ /* Sign up tab. */ }
						<div className="tab" id="sign-up">
							<p className="text-danger">L'email ou le numéro de téléphone est déjà utilisé.</p>
							<Form onSubmit={ (event) => this.onRegisterSubmit(event) }>
								<Form.Group controlId="lastName">
									<Form.Label>Nom*</Form.Label>
									<Form.Control type="text" onChange={ (e) => this.setState({lastName: e.target.value}) } />
								</Form.Group>

								<Form.Group controlId="firstName">
									<Form.Label>Prénom*</Form.Label>
									<Form.Control type="text" onChange={ (e) => this.setState({firstName: e.target.value}) } />
								</Form.Group>

								<Form.Group controlId="email">
									<Form.Label>Email ou numéro de portable*</Form.Label>
									<Form.Control type="email" onChange={ (e) => this.setState({email: e.target.value}) } />
								</Form.Group>

								<Form.Group controlId="password">
									<Form.Label>Mot de passe*</Form.Label>
									<Form.Control type="password" onChange={ (e) => this.setState({password: e.target.value}) } />
									<Form.Text className="text-muted">Minimum 6 caractères.</Form.Text>
								</Form.Group>

								<Form.Group controlId="passwordConfirm">
									<Form.Label>Confirmer le mot de passe*</Form.Label>
									<Form.Control type="password" onChange={ (e) => this.setState({passwordConfirm: e.target.value}) } />
								</Form.Group>

								<Form.Group controlId="accountType">
									<Form.Label>S'inscrire en tant que*</Form.Label>
									<Form.Select>
										<option>Choisissez un type de compte</option>
										<option value="0">Client</option>
										<option value="1">Artisan / Commerçant</option>
									</Form.Select>
								</Form.Group>

								<Form.Group controlId="accept">
									<Form.Check label="J'accepte les Conditions Générales d'Utilisation et reconnais avoir été informé que mes données personnelles seront utilisées tel que décrit et détaillé dans la Politique de protection des données personnelles*" />
								</Form.Group>

								<div className="text-center"><button type="submit">Je m'inscris</button></div>
							</Form>
						</div>
					</Tabs>
				</Container>

				<Footer />
			</>
		);
	}
}

export default Connect;