import React from 'react'
import pathToRegexp from 'path-to-regexp'

import { getMenuData, getFlatMenus } from './menu'

function routeWrapper (Component) {
  return props => {
    const menuData = getMenuData()
    const routerData = getRouterData()

    return (
      <Component
        {...props}
        menuData={menuData}
        routerData={routerData}
      />
    )
  }
}

const routerConfig = {
  '/': {
    redirect: '/task',
    component: routeWrapper(require('../layouts/BasicLayout'))
  },

  '/task': {
    redirect: '/task/analysis'
  },

  '/task/analysis': {
    component: routeWrapper(require('../routes/Analysis'))
  },

  '/task/table': {
    component: routeWrapper(require('../routes/Table'))
  },

  '/task/form': {
    component: routeWrapper(require('../routes/Form'))
  }
}

export const getRouterData = () => {
  const menuData = getFlatMenus(getMenuData())

  const routerData = Object.keys(routerConfig).reduce((routers, path) => {
    const pathRegexp = pathToRegexp(path)
    const menuItem = menuData.find(menuItem => pathRegexp.test(menuItem.path)) || {}

    if (menuItem) {
      const router = {
        ...routerConfig[path],
        name: menuItem.name
      }

      routers[path] = router
    }

    return routers
  }, {})

  return routerData
}
