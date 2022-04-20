import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { Container, Form } from 'react-bootstrap';
import Tabs from "../components/Tabs";

import $ from 'jquery';

import UserApi from '../api/UserApi';
import { withRouter } from "../withRouter";

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

		let user = await UserApi.getUser(this.state.email, this.state.password);

		// If it's empty, this means no matching user was found.
		if (user === undefined) {
			$("#invalid-email-or-password").css("display", "inline");
		}
		else {
			this.props.setUserSignedIn(user);
			console.log(user);
			this.props.navigate("/product?id=1");
		}
	}

	// Register a new user in the database.
	// User data is retrieved from "this.state".
	async register() {

		// Password is not long enough.
		if (this.state.password.length < 6) {
			$("#sign-up-error").css("display", "inline").html("Votre mot de passe doit au moins faire 6 caractères.");
			return;
		}

		// Password and confirm do not match.
		if (this.state.password != this.state.passwordConfirm) {
			$("#sign-up-error").css("display", "inline").html("Les mots de passe ne correspondent pas.");
			return;
		}

		// Make the request!
		let data = {
			firstName: this.state.firstName, lastName: this.state.lastName,
			email: this.state.email, password: this.state.password,
			phoneNumber: "",
			isArtisan: false
		};

		await UserApi.createUser(data);

		// Sign in new user, if this fails, it means that there was an error.
		let user = await UserApi.getUser(this.state.email, this.state.password);
		if (user === undefined) {
			$("#sign-up-error").css("display", "inline").html("Une erreur s'est produite. L'email est peut-être déjà utilisé.");
		}
		else {
			this.props.setUserSignedIn(user);
		}
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
							<p className="text-danger" id="sign-up-error">L'email ou le numéro de téléphone est déjà utilisé.</p>
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
									<Form.Check id="accept" required label="J'accepte les Conditions Générales d'Utilisation et reconnais avoir été informé que mes données personnelles seront utilisées tel que décrit et détaillé dans la Politique de protection des données personnelles*" />
								</Form.Group>

								<div className="text-center"><button type="submit">Je m'inscris</button></div>
							</Form>
						</div>
					</Tabs>
				</Container>
			</>
		);
	}
}

export default withRouter(Connect);