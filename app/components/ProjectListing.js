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
          fontFamily: "Lato",
        }
      : {
          marginBottom: '18px'
        }

    const headerStyle = {
      marginBottom: '6px'
    }

    const switchStyle = {
      float: 'left',
      marginTop: '3px'
    }

    const titleStyle = {
      fontSize: '20px',
      lineHeight: '22px',
      fontWeight: 'bold',
      marginLeft: '52px',
      marginTop: '-4px'
    }

    const descStyle = {
      fontSize: '12px',
      hyphens: 'auto'
    }

    const costStyle = {
      float:'right',
      background: this.props.inverse ? '#ddd' : '#444',
      padding: '1px 5px',
      fontSize: '15px',
      fontWeight: 'bold',
      marginLeft: '4px'
    }

    const project = this.props.project
    return (
      <div style={mainStyle}>
        <div style={headerStyle}>
          <Switch onChange={() => { this.props.projectToggled() }}
            checked={project.selected}
            checkedChildren={<Glyphicon glyph='ok' />}
            unCheckedChildren={<Glyphicon glyph='remove' />}
            style={switchStyle}
          />
          <div style={costStyle}>{formatCost(getProjectCost(project))}</div>
          <div style={titleStyle} >
            {project.name}
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>
        <div style={descStyle} >
          {project.description}
        </div>
      </div>
    )
  }
}
