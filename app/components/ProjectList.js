import React, {Component, PropTypes} from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'

import ProjectListing from './ProjectListing'

export default class ProjectList extends Component {

  constructor (props) {
    super(props)
    this.state = { expanded: false }
  }

  render () {

    const header = (
      <h2 onClick={() => { this.setState({ expanded: !this.state.expanded }) }}>
        {this.props.title}
        <Glyphicon glyph={this.state.expanded ? 'chevron-up' : 'chevron-down' } className='pull-right' />
      </h2>
    )

    return (
      <Panel
        header={header}
        collapsible
      >
        {this.props.projects.map(project => {
          return <ProjectListing
            project={project}
            key={project.id}
            projectToggled={() => this.props.projectToggled(project)}
          />
        })}
      </Panel>
    )
  }
}
