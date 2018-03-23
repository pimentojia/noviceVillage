import React from 'react'
import isAbsoluteURL from 'axios/lib/helpers/isAbsoluteURL'

import { __ } from '~/utils/i18n'

const menuData = [
  {
    key: 'task',
    name: __('menu-task-hell'),
    type: 'sub',
    path: 'novice/task',
    children: [
      {
        key: 'taskboard',
        name: __('menu-task-board'),
        type: 'link',
        icon: <i className='uyicon uyicon-home' />,
        path: 'taskboard'
      },
      {
        key: 'scoreboard',
        name: __('menu-score-board'),
        type: 'link',
        icon: 'file-text',
        path: 'table'
      },
      {
        key: 'stateboard',
        name: __('menu-state-board'),
        type: 'link',
        icon: 'code-o',
        path: 'form'
      }
    ]
  },
  {
    key: 'knowledge',
    name: __('menu-knowledge-hell'),
    type: 'link',
    path: 'novice/knowledge'
  },
  {
    key: 'check',
    name: __('menu-check-hell'),
    type: 'sub',
    path: 'form',
    children: [
      {
        key: 'knowledgecheck',
        name: __('menu-check-knowledge'),
        type: 'link',
        icon: <i className='uyicon uyicon-home' />,
        path: 'form'
      },
      {
        key: 'report',
        name: __('menu-check-report'),
        type: 'link',
        icon: 'file-text',
        path: 'form'
      }
    ]
  },
  {
    key: 'home',
    name: __('menu-personal-center'),
    type: 'sub',
    path: 'task',
    children: [
      {
        key: 'workstate',
        name: __('menu-personal-work-state'),
        type: 'link',
        icon: <i className='uyicon uyicon-home' />,
        path: 'form'
      },
      {
        key: 'share',
        name: __('menu-personal-knowledge-share'),
        type: 'link',
        icon: <i className='uyicon uyicon-home' />,
        path: 'form'
      }
    ]
  },
  {
    key: 'theme',
    name: __('menu-theme'),
    type: 'default',
    icon: 'skin',
    below: true
  },
  {
    key: 'language',
    name: __('menu-language'),
    type: 'default',
    icon: 'appstore',
    below: true
  },
  {
    key: 'search',
    name: __('menu-search'),
    type: 'default',
    icon: 'search',
    below: true
  },
  {
    key: 'setting',
    name: __('menu-setting'),
    type: 'link',
    icon: 'setting',
    path: 'setting',
    below: true
  },
  {
    key: 'help',
    name: __('menu-help'),
    type: 'link',
    icon: 'question-circle-o',
    path: 'https://www.baidu.com',
    target: '_blank',
    below: true
  }
]

export const getMenuData = () => menuData

export function getFlatMenus (menuData, parentPath = '') {
  let keys = []

  menuData.forEach(item => {
    let { path } = item

    if (!isAbsoluteURL(path)) {
      path = `${parentPath}/${path}`
    }

    keys.push({
      ...item,
      path
    })

    if (item.children) {
      keys = keys.concat(getFlatMenus(item.children, path))
    }
  })

  return keys
}
