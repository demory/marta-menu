import haversine from 'haversine'

export function getProjectCost (project) {
  let cap = 0, ops = 0
  const modeCosts = MM_CONFIG.budget[project.category]
  const dist = project.geojson ? getProjectLength(project.geojson.geometry.coordinates) : 0

  console.log('cost for ' + project.id);
  // compute capital costs
  if(project.cost && project.cost.capital) {
    cap = project.cost.capital
  }
  else { // no explicit cap cost provided; use formula
    switch(project.category) {
      case 'lrt':
      case 'rail':
      case 'rapid_bus':
        cap = dist * modeCosts.capital_cost_per_mile * modeCosts.local_capital_share
    }
  }

  // compute operating costs
  if(project.cost && project.cost.operating) {
    ops = project.cost.operating * MM_CONFIG.budget.years/2
  }
  else { // no explicit O&M cost provided; use formula
    switch(project.category) {
      case 'lrt':
      case 'rail':
      case 'rapid_bus':
        ops = dist * modeCosts.operating_cost_per_mile * MM_CONFIG.budget.years * modeCosts.local_operating_share
    }
  }

  let cost = cap + ops
  if(project.percentage !== undefined) cost = cost * project.percentage/100

  console.log(cost);
  return cost
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
