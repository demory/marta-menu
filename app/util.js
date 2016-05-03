import haversine from 'haversine'

export function getProjectCost (project) {
  let cap, ops
  const modeCosts = ATF_CONFIG.budget[project.category]
  if(project.cost && (project.cost.capital || project.cost.operating)) {
    cap = project.cost.capital
    ops = project.cost.operating * ATF_CONFIG.budget.years

    if(modeCosts && modeCosts.local_capital_share) {
      cap = cap * modeCosts.local_capital_share
    }

    if(modeCosts && modeCosts.local_operating_share) {
      ops = ops * modeCosts.local_operating_share
    }
    
    let cost = cap + ops
    if(project.percentage) cost = cost * project.percentage/100

    return cost
  }
  switch(project.category) {
    case 'lrt':
    case 'rail':
    case 'rapid_bus':
      const dist = getProjectLength(project.geojson.geometry.coordinates)
      cap = dist * modeCosts.capital_cost_per_mile * modeCosts.local_capital_share
      ops = dist * modeCosts.operating_cost_per_mile * ATF_CONFIG.budget.years * modeCosts.local_operating_share
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
