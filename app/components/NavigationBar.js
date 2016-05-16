import React, {Component, PropTypes} from 'react'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'

export default class NavigationBar extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    return (
      <Navbar inverse className='container-fullwidth' fluid>
          <Navbar.Brand style={{ fontWeight: 'bold', marginLeft: '0px', marginTop: '-1px', fontSize: '22px' }}>
            {MM_CONFIG.application.title}
          </Navbar.Brand>
          <div className='pull-right'>
            <img src={MM_CONFIG.application.logo} style={{ height: '24px', marginTop: '8px' }}/>
          </div>
      </Navbar>
    )
  }
}
