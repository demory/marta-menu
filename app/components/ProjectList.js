import React, {Component, PropTypes} from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'

import ProjectListing from './ProjectListing'
import SliderProjectListing from './SliderProjectListing'

export default class ProjectList extends Component {

  constructor (props) {
    super(props)
    this.state = { expanded: false }
  }

  render () {

    const header = (
      <div style={{textDecoration: 'none'}}>
        <div
          style={{fontSize: '22px'}}
          onClick={() => { this.setState({ expanded: !this.state.expanded }) }}
        >
          <i className={`fa fa-${this.props.icon}`}></i>&nbsp;&nbsp;&nbsp;
          <b>{this.props.title}</b>
          <Glyphicon glyph={this.state.expanded ? 'chevron-up' : 'chevron-down' } className='pull-right' />
        </div>
      </div>
    )

    const projects = this.props.projects.slice(0)
    projects.sort((a, b) => {
      if(a.name < b.name) return -1
      if(a.name > b.name) return 1
      return 0
    })

    return (
      <Panel
        header={header}
        collapsible
      >
        {projects.map(project => {
          if(project.percentage !== undefined) {
            return (
              <div style={{marginBottom: '10px'}}>
                <SliderProjectListing
                  key={project.id}
                  project={project}
                  projectPercentageChanged={(pct) => this.props.projectPercentageChanged(project, pct)}
                />
                <div style={{clear: 'both'}}>&nbsp;</div>
              </div>
            )
          }
          return (
            <div key={project.id}
              onMouseEnter={(evt) => { this.props.projectHovered(project) }}
              onMouseLeave={(evt) => { this.props.projectUnhovered(project) }}
            >
              <ProjectListing
                project={project}
                projectToggled={() => this.props.projectToggled(project)}
              />
            </div>
          )
        })}
      </Panel>
    )
  }
}
