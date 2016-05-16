import React, {Component, PropTypes} from 'react'
import { Panel, Label, Glyphicon } from 'react-bootstrap'

import { getProjectCost, formatCost } from '../util'

export default class BudgetPane extends Component {

  constructor (props) {
    super(props)
  }

  getTotalCost () {
    let totalCost = 0
    this.props.projects.all.filter(proj => proj.selected).forEach(proj => {
      totalCost += getProjectCost(proj)
    })
    return totalCost
  }

  render () {

    const containerStyle = {
      position: 'fixed',
      padding: '0px',
      left: '0px',
      right: '0px',
      bottom: '0px',
      height: '80px',
      overflow: 'hidden'
    }

    const panelStyle = {
      height: '100%'
    }

    const leftStyle = {
      float: 'left',
      width: '160px',
      fontWeight: 'bold',
      textAlign: 'right'
    }

    const rightStyle = {
      float: 'right',
      width: '160px'
    }

    const centerStyle = {
      marginLeft: '170px',
      marginRight: '170px',
      paddingTop: '4px'
    }

    const totalCost = this.getTotalCost(), totalBudget = MM_CONFIG.budget.total
    const budgetUsedPct = 100 * totalCost / totalBudget

    return (
      <div style={containerStyle}>
        <Panel style={panelStyle}>
          <div style={{ marginBottom: '5px' }}>
            <div style={leftStyle}>
              Your Projects:
            </div>
            <div style={rightStyle}>
              {formatCost(this.getTotalCost())}
              {budgetUsedPct <= 100
                ? <Label bsStyle='success' className='pull-right'>
                    <Glyphicon glyph='ok' />  Under Budget
                  </Label>
                : <Label bsStyle='danger' className='pull-right'>
                    <Glyphicon glyph='alert' />  Over Budget
                  </Label>
              }
            </div>
            <div style={centerStyle}>
              <div style={{
                width: budgetUsedPct === 0 ? '1px' : (budgetUsedPct > 100 ? '100%' : `${budgetUsedPct}%`),
                height: '14px',
                background: 'orange'
              }}>&nbsp;</div>
            </div>
            <div style={{ clear: 'both '}}></div>
          </div>

          <div>
            <div style={leftStyle}>
              Total Budget:
            </div>
            <div style={rightStyle}>
            {formatCost(totalBudget)}
            </div>
            <div style={centerStyle}>
              <div style={{
                width: budgetUsedPct < 100 ? '100%' : 10000/budgetUsedPct + '%',
                height: '14px',
                background: 'lightGray' }}
              >&nbsp;</div>
            </div>
          </div>

        </Panel>
      </div>
    )
  }
}
