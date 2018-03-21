import React, { Component } from 'react'
import { Card } from '@uyun/uyd'

import './ChartCard.less'

class AnalysisChartCard extends Component {
  render () {
    const { title, children } = this.props

    return (
      <Card
        className='analysis-chart'
        bordered={false}
      >
        <div className='analysis-chart-header'>
          {title}
        </div>

        {children}
      </Card>
    )
  }
}

export default AnalysisChartCard
