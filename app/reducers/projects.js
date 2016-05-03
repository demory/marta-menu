import update from 'react-addons-update'

import allProjects from '../../projects.json'

allProjects.push({
  id: 'freq',
  name: 'Freqency Enhancements',
  category: 'local_bus',
  description: "Across-the-board improvements to MARTA's local bus service in the City of Atlanta. Drag slider to the right to select an overall percentage increase in service.",
  percentage: 0,
  cost: {
    capital: 0,
    operating: 90000000
  }
})

const projects = (state = {
  all: allProjects
}, action) => {
  let projectIndex
  switch(action.type) {
    case 'TOGGLE_PROJECT':
      projectIndex = state.all.findIndex(p => p.id === action.projectId)
      const newValue = state.all[projectIndex].selected ? false : true
      return update(state,
        {all:
          {[projectIndex]:
            {selected:
              {$set: newValue }
            }
          }
        }
      )
    case 'SET_PROJECT_PERCENTAGE':
      projectIndex = state.all.findIndex(p => p.id === action.projectId)
      return update(state,
        {all:
          {[projectIndex]:
            {$merge:
              {
                percentage: action.percentage,
                selected: action.percentage > 0
              }
            }
          }
        }
      )
  }
  return state
}

export default projects
