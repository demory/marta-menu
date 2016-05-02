import React, {Component, PropTypes} from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'

import { getProjectCost, formatCost } from '../util'

// TODO: fix this
require('../../node_modules/rc-switch/assets/index.css')
var Switch = require('rc-switch');

export default class ProjectListing extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    const mainStyle = this.props.inverse
      ? {
          color: '#444',
          fontFamily: "Lato"
        }
      : {}

    const titleStyle = {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '3px'
    }

    const descStyle = {
      fontSize: '12px',
      hyphens: 'auto'
    }

    const costStyle = {
      float:'right',
      background: this.props.inverse ? '#ddd' : '#444',
      padding: '3px 6px',
      fontSize: '15px',
      fontWeight: 'bold',
      marginLeft: '4px'
    }

    const project = this.props.project
    return (
      <div style={mainStyle}>
        <div style={titleStyle} >
          <Switch onChange={() => { this.props.projectToggled() }}
            checked={project.selected}
            checkedChildren={<Glyphicon glyph='ok' />}
            unCheckedChildren={<Glyphicon glyph='remove' />}
            style={{ marginRight: '10px' }}
          />
          <div style={costStyle}>{formatCost(getProjectCost(project))}</div>
          {project.name}
        </div>
        <div style={descStyle} >
          {project.description}
        </div>
      </div>
    )
  }
}
