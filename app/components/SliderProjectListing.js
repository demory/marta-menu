import React, {Component, PropTypes} from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'

import { getProjectCost, formatCost } from '../util'

import Rcslider from 'rc-slider'

// TODO: fix this
require('../../node_modules/rc-slider/assets/index.css')

export default class SliderProjectListing extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    const mainStyle = {
      marginBottom: '18px'
    }

    const headerStyle = {
      marginBottom: '6px'
    }

    const titleStyle = {
      fontSize: '20px',
      lineHeight: '22px',
      fontWeight: 'bold',
      marginTop: '-4px'
    }

    const descStyle = {
      fontSize: '12px',
      hyphens: 'auto',
      marginBottom: '12px'
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

    const marks = {
      0: '0%',
      5: '5%',
      10: '10%',
      15: '15%',
      20: '20%',
      25: '25%',
    }
    return (
      <div style={mainStyle}>
        <div style={headerStyle}>

          <div style={costStyle}>{formatCost(getProjectCost(project))}</div>
          <div style={titleStyle} >
            {project.name}
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>
        <div style={descStyle} >
          {project.description}
        </div>
        <div>
          <Rcslider min={0} max={25} step={5} dots={true} marks={marks} defaultValue={0}
            onChange={pct => {
              console.log(pct);
              this.props.projectPercentageChanged(pct)
            }}
          />
        </div>
      </div>
    )
  }
}
