import { Container } from "react-bootstrap";
import MyNavbar from "./MyNavbar";

const Header = (props) => {

	return (
		<header>
			<MyNavbar user={props.user} signOut={props.signOut} />

			<Container className="categories">
				<div>Alimentation</div>
				<div>Bijoux</div>
				<div>Boissons</div>
				<div>Cosmétiques</div>
				<div>Décoration</div>
				<div>Meubles</div>
				<div>Outils</div>
				<div>Vêtements</div>
			</Container>
		</header>
	);
}

export default Header;