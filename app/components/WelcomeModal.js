import React, {Component, PropTypes} from 'react'
import { Modal, Button, Glyphicon } from 'react-bootstrap'

export default class WelcomeModal extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  close () {
    this.setState({
      showModal: false
    })
  }

  open () {
    this.setState({
      showModal: true
    })
  }

  ok () {
    this.close()
  }

  render () {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
          <Modal.Title style={{ fontSize: '24px' }}>Welcome to {MM_CONFIG.application.title}!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div dangerouslySetInnerHTML={{__html: MM_CONFIG.application.welcome_text}}></div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.ok()} style={{ fontSize: '20px' }}>Let&#39;s Get Started! <i className='fa fa-chevron-right'></i></Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
