export function getProjectCost (project) {
  return project.cost.capital + project.cost.operating * ATF_CONFIG.budget.years
}

export function formatCost (cost) {
  if(cost < 1000000000) {
    return '$' + Math.round(cost/1000000) + 'M'
  }
  return '$' + Math.round(cost/100000000)/10 + 'B'

}
