import { Navbar, NavDropdown, Nav, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyMenu from './MyMenu';

import styles from '../css/MyNavbar.module.css';

import logo from "../img/logo.png";
import SearchBar from './SearchBar';

const MyNavbar = (props) => {
    return (
		<nav className={styles.navbar}>

			<Row>
				<Col>
				<MyMenu />
				<Link to="/home"><img src={logo} /></Link>
				</Col>

				<Col>
				<SearchBar />
				</Col>

				<Col>
					<div style={{float: "right"}}>
					<Link to="/payment"><button>Mon Panier</button></Link>
					{
						props.user === undefined || props.user === null ? (
							<Link to="/connect"><button>Connexion</button></Link>
						) : (
							<NavDropdown title="Mon Compte" id="basic-nav-dropdown">
								<Link to="/action/3.2">Mon Compte</Link>
								<NavDropdown.Divider />
								<Link to="/home" onClick={props.signOut}>Déconnexion</Link>
							</NavDropdown>
						)
					}
					</div>
					</Col>
				</Row>
		</nav>
    );
}

export default MyNavbar;