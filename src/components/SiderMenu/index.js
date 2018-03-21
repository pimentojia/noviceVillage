import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import pathToRegexp from 'path-to-regexp'
import SideMenu from '@uyun/ec-side-menu'

import { getFlatMenus } from '~/common/menu'

class SiderMenu extends Component {
  flatMenuKeys = []

  constructor (props) {
    super(props)

    const { menuData, location: { pathname } } = props

    this.menus = getFlatMenus(menuData)

    this.state = {
      openKeys: this.getOpenKeys(pathname),
      selectedKeys: this.getSelectedKeys(pathname)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { menuData, location: { pathname } } = nextProps

    if (pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getOpenKeys(pathname),
        selectedKeys: this.getSelectedKeys(pathname)
      })
    }

    if (menuData.length !== this.menus.length) {
      this.menus = getFlatMenus(menuData)
    }
  }

  getOpenKeys = pathname => {
    return pathname.split('/').slice(1, -1)
  }

  getSelectedKeys = pathname => {
    return this.menus
      .filter(item => pathToRegexp(item.path).test(pathname))
      .map(item => item.key)
  }

  handleOpenChange = openKeys => {
    this.setState({
      openKeys
    })
  }

  handleCollapse = collapsed => {
    const { onCollapse } = this.props
    const $body = $('body')

    $body.toggleClass('expand')
    $body.toggleClass('unexpand')

    if (onCollapse) {
      onCollapse(collapsed)
    }
  }

  render () {
    const { openKeys, selectedKeys } = this.state
    const { location, menuData, ...others } = this.props

    const MenuLink = props => (
      <Link
        {...props}
        replace={props.to === this.props.location.pathname}
      />
    )

    return (
      <SideMenu
        {...others}
        items={menuData}
        Link={MenuLink}
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        // 当需要「只展开当前父级菜单」时，可启用以下两行
        // openKeys={openKeys}
        // onOpenChange={this.handleOpenChange}
        onCollapse={this.handleCollapse}
      />
    )
  }
}

export default SiderMenu
