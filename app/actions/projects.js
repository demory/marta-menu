import fetch from 'isomorphic-fetch'

export const toggleProject = (projectId) => {
  return {
    type: 'TOGGLE_PROJECT',
    projectId
  }
}

export const setProjectPercentage = (projectId, percentage) => {
  return {
    type: 'SET_PROJECT_PERCENTAGE',
    projectId,
    percentage
  }
}

export const setProjectHighlighted = (projectId, highlighted) => {
  return {
    type: 'SET_PROJECT_HIGHLIGHTED',
    projectId,
    highlighted
  }
}

function votingForProject (project) {
  return {
    type: 'VOTING_FOR_PROJECT',
    project
  }
}

export function voteForProject (project) {
  return function (dispatch, getState) {
    dispatch(votingForProject(project))
    console.log('vote for ', project)
  }
}
