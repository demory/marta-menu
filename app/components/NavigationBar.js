import React, {Component, PropTypes} from 'react'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'

export default class NavigationBar extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    return (
      <Navbar inverse className='container-fullwidth' fluid>
          <Navbar.Brand style={{ fontWeight: 'bold', marginLeft: '0px' }}>
            <i className='fa fa-bus'></i>&nbsp;&nbsp;{ATF_CONFIG.application.title}
          </Navbar.Brand>
      </Navbar>
    )
  }
}
