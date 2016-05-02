import React, {Component, PropTypes} from 'react'
import { Panel } from 'react-bootstrap'

import ProjectList from './ProjectList'

export default class ProjectPane extends Component {

  constructor (props) {
    super(props)
  }

  getProjectsForCategory (category) {
    return this.props.projects.all.filter(proj => proj.category === category)
  }

  render () {

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
        <h3>Projects</h3>

        <ProjectList
          title='LRT/Streetcar'
          projects={this.getProjectsForCategory('lrt_streetcar')}
        />

        <ProjectList
          title='Infill Stations'
          projects={this.getProjectsForCategory('infill_stations')}
          projectToggled={(project) => this.props.projectToggled(project)}
        />

      </div>
    )
  }
}
