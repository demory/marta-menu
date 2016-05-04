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
