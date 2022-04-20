import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';
  
import Home from './pages/Home';
import Connect from './pages/Connect';
import Product from './pages/Product';
import Payment from './pages/Payment';
import Footer from './components/Footer';
import Header from './components/Header';
import Artisan from './pages/Artisan';



class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			user: undefined,
			cart: ["test1", "test2", "test3"]
		};
	}

	componentDidMount() {
		if (localStorage.getItem("user") !== "undefined") {
			this.setState({ user: JSON.parse(localStorage.getItem("user")) });
		}

		window.onbeforeunload = () => {
			localStorage.setItem("user", this.state.user === undefined ? "undefined" : JSON.stringify(this.state.user));
		};
	}

	setUserSignedIn(user) {
		this.setState( {user: user} );
	}

	signOut() {
		this.setState( {user: undefined} );
		localStorage.setItem("user", "undefined");
	}

	render() {
		return (
			<>
				<Router>
					<Header user={this.state.user} signOut={() => this.signOut()} />

					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/connect" element={<Connect setUserSignedIn={(user) => this.setUserSignedIn(user)} />} />

						<Route exact path="/product" element={<Product user={this.state.user} />} />
						<Route exact path="/artisan" element={<Artisan />} />

						<Route exact path="/payment" element={<Payment cart={this.state.cart} />} />
					</Routes>
				</Router>

				<Footer />
			</>
		);
	}
}

export default App;