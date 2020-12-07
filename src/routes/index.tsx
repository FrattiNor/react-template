import React, { FC } from 'react'
import ReactDocumentTitle from 'react-document-title'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { loadModel, getComponent } from './utils'
import menu from './menu'

// 递归渲染路由
const Routes: FC<{ app: any }> = ({ app }) => {
    const renderRoute = (list: routeItem[]): JSX.Element => {
        const renderRouteDom = list.map(({ path, component, routes, redirect, title = '', models }: routeItem) => {
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
                    render={(props): JSX.Element => (
                        <ReactDocumentTitle title={title}>
                            <Component {...props} child={routes}>
                                {Array.isArray(routes) && routes.length > 0 && renderRoute(routes)}
                            </Component>
                        </ReactDocumentTitle>
                    )}
                />
            )
        })

        return <Switch>{renderRouteDom}</Switch>
    }

    return <BrowserRouter>{renderRoute(menu)}</BrowserRouter>
}

export default Routes
