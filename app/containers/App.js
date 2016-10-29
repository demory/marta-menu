import React from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import ProjectPane from '../components/ProjectPane'
import BudgetPane from '../components/BudgetPane'
import MapPane from '../components/MapPane'
import WelcomeModal from '../components/WelcomeModal'

import { toggleProject, setProjectPercentage, setProjectHighlighted, voteForProject } from '../actions/projects'

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      hour: '7:00am',
      am: true,
      ons: true
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <div>
        <WelcomeModal ref='welcomeModal'/>

        <NavigationBar />
        <ProjectPane
          projects={this.props.projects}
          sliderChanged={(value) => this.setState({hour: value})}
          peakChanged={(value) => this.setState({am: !this.state.am})}
          countTypeChanged={(value) => this.setState({ons: !this.state.ons})}
          hour={this.state.hour}
          am={this.state.am}
          ons={this.state.ons}
          voteForProject={(project) => this.props.voteForProject(project)}
          projectToggled={(project) => this.props.projectToggled(project)}
          projectPercentageChanged={(project, pct) => this.props.projectPercentageChanged(project, pct)}
          projectHovered={(project) => this.props.projectHovered(project)}
          projectUnhovered={(project) => this.props.projectUnhovered(project)}
        />
        <BudgetPane projects={this.props.projects} />
        <MapPane
          projects={this.props.projects}
          hour={this.state.hour}
          am={this.state.am}
          ons={this.state.ons}
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
