import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Breadcrumb } from '@uyun/uyd'
import pathToRegexp from 'path-to-regexp'

import { __ } from '~/utils/i18n'

import './index.less'

function urlToList (url) {
  const urllist = url.split('/').filter(i => i)
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`
  })
}

function getBreadcrumb (routerData, url) {
  let breadcrumb = routerData[url]
  if (!breadcrumb) {
    Object.keys(routerData).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = routerData[item]
      }
    })
  }
  return breadcrumb || {}
}

class PageHeader extends Component {
  static contextTypes = {
    location: PropTypes.object,
    routerData: PropTypes.object
  };

  getBreadcrumbs = () => {
    const { breadcrumbSeparator } = this.props
    const { routerData, location } = this.context

    const pathSnippets = urlToList(location.pathname)

    const breadcrumbItems = pathSnippets.map((url, index) => {
      const breadcrumb = getBreadcrumb(routerData, url)

      return breadcrumb.name && !breadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumb.name}
          </Link>
        </Breadcrumb.Item>
      ) : null
    })

    breadcrumbItems.unshift(
      <Breadcrumb.Item key='home'>
        <Link to='/'>
          {__('menu-index')}
        </Link>
      </Breadcrumb.Item>
    )

    return (
      <Breadcrumb separator={breadcrumbSeparator}>
        {breadcrumbItems}
      </Breadcrumb>
    )
  }

  render () {
    return (
      <div className='page-header'>
        {this.getBreadcrumbs()}
      </div>
    )
  }
}

export default PageHeader
