import React from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import ProjectPane from '../components/ProjectPane'
import BudgetPane from '../components/BudgetPane'
import MapPane from '../components/MapPane'

import { toggleProject } from '../actions/projects'

class App extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  render () {
    console.log('render app');
    return (
      <div>
        <NavigationBar />
        <ProjectPane
          projects={this.props.projects}
          projectToggled={(project) => this.props.projectToggled(project)}
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
    projectToggled: (project) => { dispatch(toggleProject(project.id)) }
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default App
