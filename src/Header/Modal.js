import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "./modal.css"

export default class ModalWindow extends Component {
  constructor(props){
    super(props)
    this.msj=null;
    this.state = {
      isOpen: false,
      msg:""
    };
    
  }
 
  
  openModal = () => this.setState({ isOpen:true });
  closeModal = () => this.setState({ isOpen: false });
  closeModalKey = () => this.setState({ isOpen: false });
  message = (message) => this.setState({msg:message})

  render() {
    return (
      <>

        {/* <Button variant="primary" onClick={this.openModal}>
            Mi Modal
        </Button> */}

        <Modal show={this.state.isOpen} onHide={this.closeModal} className="modal">
          <Modal.Header closeButton>
            <Modal.Title>Oops...!!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-5">{this.state.msg}</Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary" onClick={this.closeModal} onKeyPress={this.closeModalKey}>
              Close
            </Button> */}
            <button className="boton-modal" onClick={this.closeModal} onKeyPress={this.closeModalKey}>Close</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

 

