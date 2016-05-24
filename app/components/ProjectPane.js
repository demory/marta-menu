import React, {Component, PropTypes} from 'react'
import { Panel, Button } from 'react-bootstrap'

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
