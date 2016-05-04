import React from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import ProjectPane from '../components/ProjectPane'
import BudgetPane from '../components/BudgetPane'
import MapPane from '../components/MapPane'

import { toggleProject, setProjectPercentage, setProjectHighlighted } from '../actions/projects'

class App extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <ProjectPane
          projects={this.props.projects}
          projectToggled={(project) => this.props.projectToggled(project)}
          projectPercentageChanged={(project, pct) => this.props.projectPercentageChanged(project, pct)}
          projectHovered={(project) => this.props.projectHovered(project)}
          projectUnhovered={(project) => this.props.projectUnhovered(project)}
        />
        <BudgetPane projects={this.props.projects} />
        <MapPane
          projects={this.props.projects}
          projectToggled={(project) => this.props.projectToggled(project)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    projectToggled: (project) => { dispatch(toggleProject(project.id)) },
    projectPercentageChanged: (project, pct) => { dispatch(setProjectPercentage(project.id, pct))},
    projectHovered: (project) => dispatch(setProjectHighlighted(project.id, true)),
    projectUnhovered: (project) => dispatch(setProjectHighlighted(project.id, false))
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default App
