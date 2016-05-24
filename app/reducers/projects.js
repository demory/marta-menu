import update from 'react-addons-update'

// initialize the projects from the provided json file
import allProjects from '../../projects.json'

// check for initially selected projects in the URL params
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

const selectedIds = getURLParameter('projects')
let freqPct = 0
if(selectedIds) {
  selectedIds.split(',').forEach(id => {
    const proj = allProjects.find(p => p.id === id)
    if(id.startsWith('freq')) {
      freqPct = parseInt(id.substr(4))
    }
    else if(proj) proj.selected = true
  })
}

// add the special frequency project
allProjects.push({
  id: 'freq',
  name: 'Freqency Enhancements',
  category: 'local_bus',
  description: "Across-the-board improvements to MARTA's local bus service in the City of Atlanta. Drag slider to the right to select an overall percentage increase in service.",
  percentage: freqPct,
  selected: freqPct > 0,
  cost: {
    capital: 0,
    operating: 90000000
  }
})


const projects = (state = {
  all: allProjects,
  highlighted: null
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
    case 'SET_PROJECT_HIGHLIGHTED':
      return update(state,
        {highlighted:
          {$set: (action.highlighted ? action.projectId : null) }
        }
      )
  }
  return state
}

export default projects
