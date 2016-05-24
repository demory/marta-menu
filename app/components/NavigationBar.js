import React, {Component, PropTypes} from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'

import WelcomeModal from './WelcomeModal'

export default class NavigationBar extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.refs.welcomeModal.open()
  }

  render () {

    return (
      <Navbar inverse className='container-fullwidth' fluid>
        <WelcomeModal ref='welcomeModal' />
        <Navbar.Brand style={{ fontWeight: 'bold', marginLeft: '0px', marginTop: '-1px', fontSize: '22px' }}>
          <i className='fa fa-list'></i>&nbsp;&nbsp;{MM_CONFIG.application.title}
        </Navbar.Brand>
        <Nav onSelect={(evt, key) => {
          console.log('selected',key);
          switch(key) {
            case 'about.welcome':
              this.refs.welcomeModal.open()
              break;
            case 'about.source':
              window.location = 'https://github.com/demory/marta-menu'
              break
          }
        }}>
          <NavDropdown eventKey='about' title="About" id="nav-dropdown">
            <MenuItem eventKey='about.welcome'>Welcome</MenuItem>
            <MenuItem eventKey='about.source'>Source Code on GitHub</MenuItem>
          </NavDropdown>
        </Nav>

        <div className='pull-right'>
          <a href={MM_CONFIG.application.sponsor_url}>
            <img src={MM_CONFIG.application.logo} style={{ height: '24px', marginTop: '8px' }}/>
          </a>
        </div>

      </Navbar>
    )
  }
}
