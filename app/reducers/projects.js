import update from 'react-addons-update'

import allProjects from '../../projects.json'

const projects = (state = {
  all: allProjects
}, action) => {
  switch(action.type) {
    case 'TOGGLE_PROJECT':
      const projectIndex = state.all.findIndex(p => p.id === action.projectId)
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
  }
  return state
}

export default projects
