import React, {Component, PropTypes} from 'react'
import { Panel, Button, ButtonGroup, ButtonToolbar, Input } from 'react-bootstrap'
require('rc-slider/assets/index.css')
import Rcslider from 'rc-slider'
import moment from 'moment'

import ProjectList from './ProjectList'
import ActionModal from './ActionModal'

export default class ProjectPane extends Component {

  constructor (props) {
    super(props)
  }

  getProjectsForCategory (category) {
    return this.props.projects.all.filter(proj => proj.category === category)
  }

  render () {
    const times = []
    // APC_DATA.map(d => {
    //   times.push(moment(d.timemin, 'h:mma'))
    // })
    // let min = Math.min( ...times )
    // let max = Math.max( ...times )
    const style = {
      position: 'fixed',
      width: '400px',
      padding: '20px',
      top: '40px',
      bottom: '80px',
      overflow: 'auto'
    }

    return (
      <div style={style}>
        <h3 style={{ textAlign: 'center', marginBottom: '24px' }}>View boardings/alightings</h3>
        <Input style={{marginTop: '0px', marginBottom: '0px'}} type="checkbox" inline label="Show existing routes" checked={!this.props.hideRoutes} onChange={() => this.props.toggleRoutes()}/>
        <Input style={{marginTop: '0px', marginBottom: '0px'}} type="checkbox" inline label="Show heatmap" checked={!this.props.hideHeatmap} onChange={() => this.props.toggleHeatmap()}/>
        <ButtonToolbar>
          <ButtonGroup>
            <Button
              active={this.props.am}
              onClick={() => this.props.peakChanged()}
            >AM Peak</Button>
            <Button
              active={!this.props.am}
              onClick={() => this.props.peakChanged()}
            >PM Peak</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              active={this.props.ons}
              onClick={() => this.props.countTypeChanged()}
            >Ons</Button>
            <Button
              active={!this.props.ons}
              onClick={() => this.props.countTypeChanged()}
            >Offs</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <h3 style={{ textAlign: 'center', marginBottom: '24px' }}>Potential Projects</h3>
        {MM_CONFIG.categories.map(category => {
          return (
            <ProjectList
              key={category.type}
              type={category.type}
              title={category.title}
              icon={category.icon}
              description={category.description}
              projects={this.getProjectsForCategory(category.type)}
              projectToggled={(project) => this.props.projectToggled(project)}
              voteForProject={(project) => this.props.voteForProject(project)}
              projectPercentageChanged={(project, pct) => this.props.projectPercentageChanged(project, pct)}
              projectHovered={(project) => this.props.projectHovered(project)}
              projectUnhovered={(project) => this.props.projectUnhovered(project)}
            />
          )
        })}

        <ActionModal ref='actionModal' projects={this.props.projects} />
        <p style={{ textAlign: 'center', marginTop: '36px' }}>
          <Button
            style={{ fontSize: '20px' }}
            onClick={() => {
              this.refs.actionModal.open()
            }}
          >
            <i className='fa fa-bullhorn'></i>&nbsp;&nbsp;Share / Take Action!
          </Button>
        </p>


      </div>
    )
  }
}
