import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";

import methodes_paiement from "../img/methodes_paiement.png";

import styles from "../css/Payment.module.css";

class Payment extends React.Component {

	static Panel = (props) => {
		return (
			<div className={styles.paymentPanel}>
				{props.children}
			</div>
		);
	};

	static ProductRectangle = (props) => {
		return (
			<div>
				{props.text}
			</div>
		);
	};

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<>
				<Container style={{ background: "white", minHeight: "100vh" }}>
					<Row>
						<Col xs="7" style={{ padding: "0" }}>
							<Payment.Panel>
								<div className="d-flex">
									<h2 className="text-uppercase" style={{flex: "1"}}>Mon Panier</h2>
									<p>Les articles seront réservés pendant 60 minutes</p>
								</div>
							</Payment.Panel>

							{ /* Shopping cart contents. */ }
							<Payment.Panel>
								<div style={{ background: "white" }}>
									{this.props.cart.length == 0 ? "Votre panier est vide." : this.props.cart.map((u, i) => {
										return (
											<>		
												<hr />
												<Payment.ProductRectangle text={u} />
											</>
										);
									})}
								</div>
							</Payment.Panel>

							<Payment.Panel>
								<p className="text-uppercase">Sous-total</p>
							</Payment.Panel>
						</Col>
						<Col xs="5" style={{ padding: "0" }}>
							<Payment.Panel>
								<h2 className="text-uppercase">Total</h2>

								<div className="text-center"><button>Paiement</button></div>

								<div className={styles.acceptedPaymentMethodsPanel}>
									<p className="text-uppercase">Nous acceptons :</p>
									<img src={methodes_paiement} />
								</div>
							</Payment.Panel>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default Payment;