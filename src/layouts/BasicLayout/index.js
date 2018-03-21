import React, { Component } from 'react'
import { autorun } from 'mobx'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import { Layout } from '@uyun/uyd'
import SiderMenu from '~/components/SiderMenu'
import NotFound from '~/routes/NotFound'

import { getRedirects, getRoutes } from '~/utils/utils'
import { setCookie } from '~/utils/cookies'

import './index.less'

const { Content } = Layout

@inject('globalStore')
@observer
class BasicLayout extends Component {
  static childContextTypes = {
    location: PropTypes.object,
    routerData: PropTypes.object
  }

  state = {
    collapsed: false
  }

  constructor (props) {
    super(props)

    this.languageDisposer = autorun(() => {
      const { language } = this.props.globalStore

      setCookie('language', language)
    })

    this.themeDisposer = autorun(() => {
      const { theme } = this.props.globalStore

      setCookie('skin', theme)

      $('html').removeClass().addClass(theme)
    })
  }

  getChildContext () {
    const { location, routerData } = this.props
    return {
      location,
      routerData
    }
  }

  componentWillUnmount () {
    this.languageDisposer()
    this.themeDisposer()
  }

  handleCollapse = collapsed => {
    this.setState({ collapsed })
  }

  handleClick = ({ key }) => {
    switch (key) {
      case 'theme':
        this.props.globalStore.changeTheme()

        break

      case 'language':
        this.props.globalStore.changeLanguage()

        window.location.reload()

        break

      default:
        break
    }
  }

  render () {
    const {
      collapsed
    } = this.state

    const {
      match,
      location,
      menuData,
      routerData
    } = this.props

    const redirects = getRedirects(match.path, routerData)
      .map(item => <Redirect {...item} />)

    const routes = getRoutes(match.path, routerData)
      .map(item => <Route {...item} />)

    return (
      <Layout className='basic-layout'>
        <SiderMenu
          location={location}
          menuData={menuData}
          collapsed={collapsed}
          onCollapse={this.handleCollapse}
          onClick={this.handleClick}
        />

        <Content
          className='basic-layout-container'
          style={{ marginLeft: collapsed ? 44 : 160 }}
        >
          <Switch>
            {redirects}

            {routes}

            <Route render={NotFound} />
          </Switch>
        </Content>
      </Layout>
    )
  }
}

export default BasicLayout
