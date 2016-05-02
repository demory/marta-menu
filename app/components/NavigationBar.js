import React, {Component, PropTypes} from 'react'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'

export default class NavigationBar extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/explore'>{ATF_CONFIG.application.title}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    )
  }
}
