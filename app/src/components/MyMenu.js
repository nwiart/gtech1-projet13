import { Offcanvas, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const MyMenu = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Menu
			</Button>
			<Offcanvas show={show} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>MENU</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
				<NavDropdown title="Catégories" id="basic-offcanvas-dropdown">
					<Link to="/action/3.1">viandes</Link>
					<NavDropdown.Divider />
					<Link to="/action/3.2">légumes</Link>
					<NavDropdown.Divider />
					<Link to="/action/3.3">meuble</Link>
					<NavDropdown.Divider />
					<Link to="/action/3.4">ect...</Link>
				</NavDropdown>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default MyMenu