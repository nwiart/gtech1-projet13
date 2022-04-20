import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyMenu from './MyMenu';

function MyNavbar() {
    return (
            <Navbar bg="light" expand="xxl" variant="light">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/home">Home</Link>
                    <MyMenu />
                    <Link to="/link">Link</Link>
                    <NavDropdown title="Mon Compte" id="basic-nav-dropdown">
                    <Link to="/action/3.1">Mon Panier</Link>
                    <NavDropdown.Divider />
                    <Link to="/action/3.2">Mon Compte</Link>
                    <NavDropdown.Divider />
                    <Link to="/action/3.3">Déconnexion</Link>
                    <NavDropdown.Divider />
                    <Link to="/action/3.4">...</Link>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    );
}
export default MyNavbar;