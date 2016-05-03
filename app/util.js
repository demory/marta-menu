import haversine from 'haversine'

export function getProjectCost (project) {
  if(project.cost && (project.cost.capital || project.cost.operating)) {
    return project.cost.capital + project.cost.operating * ATF_CONFIG.budget.years
  }
  switch(project.category) {
    case 'lrt':
    case 'rail':
    case 'rapid_bus':
      const dist = getProjectLength(project.geojson.geometry.coordinates)
      const modeCosts = ATF_CONFIG.budget[project.category]
      const cap = dist * modeCosts.capital_cost_per_mile * modeCosts.local_capital_share
      const ops = dist * modeCosts.operating_cost_per_mile * ATF_CONFIG.budget.years * modeCosts.local_operating_share
      return cap + ops
  }

  return 0
}

export function formatCost (cost) {
  if(cost < 1000000000) {
    return '$' + Math.round(cost/1000000) + 'M'
  }
  return '$' + Math.round(cost/100000000)/10 + 'B'

}

function getProjectLength (coords) {
  let dist = 0
  for(let i = 0; i < coords.length - 1; i++) {
    const start = {
      longitude: coords[i][0],
      latitude: coords[i][1]
    }
    const end = {
      longitude: coords[i+1][0],
      latitude: coords[i+1][1]
    }
    dist += haversine(start, end, {unit: 'mi'})
  }
  return dist
}
