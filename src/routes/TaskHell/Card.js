import React, { Component } from 'react'
import { Icon, Card } from '@uyun/uyd'

import './index.less'

class TaskCard extends Component {
  render () {
    const { background, icon, title, value } = this.props

    return (
      <Card
        className='task-card'
        bordered={false}
      >
        <div
          className='task-card-icon'
          style={{ background }}>
          <Icon type={icon} />
        </div>

        <div className='task-card-content'>
          <div className='task-card-title'>{title}</div>
          <div className='task-card-value'>{value}</div>
        </div>
      </Card>
    )
  }
}

export default TaskCard
