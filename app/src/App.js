import logo from './logo.svg';
import './App.css';

import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Routes,
  } from 'react-router-dom';
  
import Home from './pages/Home';



class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<Router>
					<Routes>
						<Route exact path="/" element={<Home />} />
					</Routes>
				</Router>
			</>
		);
	}
}

export default App;