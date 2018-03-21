export function getRedirects (path, routerData) {
  const paths = Object.keys(routerData).filter(routePath =>
    routePath.indexOf(path) === 0 && routerData[routePath].redirect)

  return paths.map(path => ({
    key: path,
    exact: true,
    from: path,
    to: routerData[path].redirect
  }))
}

export function getRoutes (path, routerData) {
  const paths = Object.keys(routerData).filter(routePath =>
    routePath.indexOf(path) === 0 && routePath !== path)

  return paths.map(path => {
    const route = routerData[path]

    return {
      key: path,
      path,
      exact: route.exact != null ? route.exact : true,
      strict: route.strict != null ? route.strict : false,
      component: route.component
    }
  })
}
