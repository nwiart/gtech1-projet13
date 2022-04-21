import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor(props){
    super(props)
    this.state={
      modalShow: false,
    }
  }

  handleClose = () => this.setState({modalShow: false});
  handleShow = () => this.setState({modalShow: true});

  sendCommand = async() => {
    let gamesId = [];
    let games = JSON.parse(localStorage.getItem('gamesInTheCart'));

    games.forEach(game => gamesId.push(game.id));
    
    if (gamesId.length > 0) {
    
      await fetch('http://localhost:1337/api/product', {
        method: 'POST', 
        headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify({
          data:{
            numberOfArticles: games.length,
            total: Number(localStorage.getItem('totalPrice')),
            games: gamesId,
          },
        }),
      })

      gamesId.forEach(async(id, i) => await fetch('http://localhost:1337/api/games/' + id, {
        method: 'PUT',
        headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify({
          data:{
            sold: games[i].attributes.sold + 1,
          }
        })
      }))

      localStorage.removeItem("gamesInTheCart");
      localStorage.removeItem("totalPrice");
    }
  }

  render(){
    return (
      <>
        <Container className='bg-dark cart-page'>
          <Row>
            <Col xs={10} xl={10}>
              <h2 className='text-center'>Panier</h2>
              <div className="line"></div>
              <Container className='text-center cart-articles'>
              </Container>
            </Col>
            <Col>
              <h2 className='text-center'>Votre total</h2>
              <div className="line"></div>
              <Row>
                <Col><span>Total: </span></Col>
                <Col><strong className='float-end'>{(localStorage.getItem('totalPrice') || "0.00") + " €"}</strong></Col>
              </Row>
              <div className='line'/>
              {localStorage.getItem('gamesInTheCart') && localStorage.getItem('gamesInTheCart').length > 0 &&
                <div className='text-center'>
                  <Button size="sm" variant="light" style={{ width: '50%' }} onClick={()=>this.sendCommand() && this.handleShow()}>Payer</Button>
                </div>
              }
            </Col>
          </Row>
        </Container>

        <Modal show={this.state.modalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Footer>
            <Link to='/'>
              <Button variant="secondary" onClick={this.handleClose}>
                Retour
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Cart;