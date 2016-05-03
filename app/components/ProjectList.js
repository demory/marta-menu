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
        {this.props.type === 'local_bus2'
          ? <div>
              <SliderProjectListing
                project={{
                  name: 'Frequency Improvement',
                  description: "Across-the-board improvements to MARTA's local bus service in the City of Atlanta. Drag slider to the right to select an overall percentage increase in service."
                }}
              />
            </div>
          : null
        }
        {this.props.projects.map(project => {
          if(project.percentage !== undefined) {
            return (
              <SliderProjectListing
                key={project.id}
                project={project}
                projectPercentageChanged={(pct) => this.props.projectPercentageChanged(project, pct)}
              />
            )
          }
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
