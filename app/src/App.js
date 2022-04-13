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
						<Route exact path="/connect" element={<Connect />} />
					</Routes>
				</Router>
			</>
		);
	}
}

export default App;