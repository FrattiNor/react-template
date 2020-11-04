interface RouteList {
    path?: string
    component?: any
    routes?: any[]
    redirect?: string
    title?: string
    models?: string[]
}

import React from 'react'
import ReactDocumentTitle from 'react-document-title'
import { createBrowserHistory } from 'history'
import { Route, Switch, Redirect, Router } from 'react-router-dom'
import { loadModel, getComponent } from './utils'
import menu from './menu'

const history = createBrowserHistory()

// 递归渲染路由
const Routes = ({ app }: { app: any }): JSX.Element => {
    const renderRoute = (list: any): JSX.Element => {
        const renderRouteDom = list.map(({ path, component, routes, redirect, title = '', models }: RouteList) => {
            // 加载model
            if (models) {
                loadModel(models, app)
            }

            // 重定向
            if (redirect) {
                if (path) {
                    return <Redirect key={`${redirect} ${path}`} path={path} exact to={redirect} />
                } else {
                    return <Redirect key={redirect} to={redirect} />
                }
            }

            // 渲染route
            const Component = getComponent(component)
            const hasChild = Array.isArray(routes) && routes.length > 0
            return (
                <Route
                    key={path}
                    path={path}
                    exact={!hasChild}
                    render={(props: any): JSX.Element => (
                        <ReactDocumentTitle title={title}>
                            <Component {...props} child={routes}>
                                {hasChild && renderRoute(routes)}
                            </Component>
                        </ReactDocumentTitle>
                    )}
                />
            )
        })

        return <Switch>{renderRouteDom}</Switch>
    }

    return <Router history={history}>{renderRoute(menu)}</Router>
}

export default Routes
