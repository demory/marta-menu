import React, {Component, PropTypes} from 'react'
import { Panel, Glyphicon, Button } from 'react-bootstrap'
import Icon from 'react-fa'

import { getProjectCost, formatCost } from '../util'

// TODO: fix this
require('../../node_modules/rc-switch/assets/index.css')
var Switch = require('rc-switch');

export default class ProjectListing extends Component {

  constructor (props) {
    super(props)
    this.state ={}
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
    const voteStyle = {
      float:'right',
      background: this.state.voted
        ? '#66CD00'
        : this.props.inverse
        ? '#ddd'
        : '#444',
      padding: '1px 5px',
      fontSize: '12px',
      fontWeight: 'bold',
      marginLeft: '4px'
    }

    const project = this.props.project
    const MAX = 500
    const MIN = 5
    const number = Math.floor(Math.random() * 40) + 1
    return (
      <div style={mainStyle}>
        <div style={headerStyle}>
          <Switch onChange={() => { this.props.projectToggled() }}
            checked={project.selected}
            checkedChildren={<Glyphicon glyph='ok' />}
            unCheckedChildren={<Glyphicon glyph='remove' />}
            style={switchStyle}
          /> {
                /*Math.floor(Math.random() * MAX) + MIN*/
              }
          <div style={costStyle}>{formatCost(getProjectCost(project))}</div>
          <div style={titleStyle} >
            {project.name}
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>
        <div style={descStyle} >
          {/*
          <Button
            bsSize='xsmall'
            style={voteStyle}
            onClick={() => {
              this.setState({voted: true})
              // this.props.voteForProject(project)
            }}
          ><Icon name={this.state.voted ? 'check-square-o' : 'square-o'}/> Vote! {this.state.voted ? project.votes + 1 : project.votes}</Button>
        */}
          {project.description}
        </div>
      </div>
    )
  }
}
