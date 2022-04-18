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



class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			cart: ["test1", "test2", "test3"]
		};
	}

	render() {
		return (
			<>
				<Router>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/connect" element={<Connect />} />

						<Route exact path="/product" element={<Product />} />

						<Route exact path="/payment" element={<Payment cart={this.state.cart} />} />
					</Routes>
				</Router>
			</>
		);
	}
}

export default App;