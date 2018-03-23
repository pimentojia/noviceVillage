import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Table, Badge, Button, Modal } from '@uyun/uyd'
import moment from 'moment'

import TaskCard from './Card'
import PageHeader from '~/components/PageHeader'
import { __ } from '~/utils/i18n'

import './index.less'

const topColResponsive = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 6
}

const statusMap = ['default', 'processing', 'success']

const statusTextMap = [
  __('table-status-pending'),
  __('table-status-running'),
  __('table-status-success')
]

const columns = [
  {
    title: __('task-column-name'),
    dataIndex: 'name',
    render: name => <Link to='/'>{name}</Link>
  },
  {
    title: __('task-column-user'),
    dataIndex: 'user',
    render: user => {
      const userMap = {
        1: user.realname,
        2: __('task-user-admin'),
        3: '--'
      }
      return userMap[user.userBelongType]
    }
  },
  {
    title: __('task-column-issue-time'),
    dataIndex: 'issueTime',
    render: issueTime => issueTime && moment(issueTime).format('YYYY-MM-DD')
  },
  {
    title: __('task-column-start-time'),
    dataIndex: 'startTime',
    render: startTime => startTime && moment(startTime).format('YYYY-MM-DD')
  },
  {
    title: __('task-column-period-time'),
    dataIndex: 'period',
    render: period => period + __('units-hour')
  },
  {
    title: __('task-column-exec-duration'),
    dataIndex: 'execDuration',
    render: execDuration => `${Math.round(execDuration / 1000)}s`
  },
  {
    title: __('task-column-status'),
    dataIndex: 'status',
    render: status => <Badge status={statusMap[status]} text={statusTextMap[status]} />
  },
  {
    title: __('task-column-handle'),
    render: (text, record) => (
      <Row>
        <Col span={12}>
          <Button type='primary' onClick={acceptConfirm}>{__('task-column-handle-accept')}</Button>
        </Col>
        {record.status !== 2 && (
          <Col span={12}>
            <Button type='primary' onClick={doneConfirm}>{__('task-column-handle-done')}</Button>
          </Col>
        )}
      </Row>
    )
  }
]

const confirm = Modal.confirm

function acceptConfirm () {
  confirm({
    title: __('task-accept-title'),
    content: __('task-accept-content'),
    onOk () {
      console.log(__('button-ok'))
    },
    onCancel () {
      console.log(__('button-cancel'))
    }
  })
}

function doneConfirm () {
  confirm({
    title: __('task-done-title'),
    content: __('task-done-content'),
    onOk () {
      console.log(__('button-ok'))
    },
    onCancel () {
      console.log(__('button-cancel'))
    }
  })
}

@inject('taskStore')
@observer
class TaskHell extends Component {
  componentDidMount () {
    this.props.taskStore.getCount()
      .then(() => {
        this.props.taskStore.getList()
      })
  }

  render () {
    const { taskStore } = this.props

    return (
      <div className='basic-table'>
        <PageHeader />

        <Row
          gutter={16}
          style={{ marginTop: 16 }}
        >
          <Col {...topColResponsive}>
            <TaskCard
              background='#fed62d'
              icon='clock-circle-o'
              title={__('task-board-project')}
              value={taskStore.count.project}
           />
          </Col>

          <Col {...topColResponsive}>
            <TaskCard
              background='#fed62d'
              icon='clock-circle-o'
              title={__('task-board-daily')}
              value={taskStore.count.daily}
            />
          </Col>

          <Col {...topColResponsive}>
            <TaskCard
              background='#fed62d'
              icon='clock-circle-o'
              title={__('task-board-question')}
              value={taskStore.count.question}
            />
          </Col>

          <Col {...topColResponsive}>
            <TaskCard
              background='#4abafd'
              icon='clock-circle-o'
              title={__('task-board-history')}
              value={taskStore.count.history}
            />
          </Col>

        </Row>

        <Card
          bordered={false}
          style={{ marginTop: 16 }}
        >
          <Table
            rowKey='id'
            dataSource={taskStore.data}
            columns={columns}
          />
        </Card>
      </div>
    )
  }
}

export default TaskHell
