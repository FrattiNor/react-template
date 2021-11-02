interface RouteList {
    path?: string
    component?: any
    routes?: RouteList[]
    redirect?: string
    title?: string
    models?: string[]
    exact?: boolean
}

import React, { Fragment, useEffect, FC } from 'react'
import ReactDocumentTitle from 'react-document-title'
import { Route, Switch, Redirect } from 'react-router-dom'
import { loadModel, getComponent } from './utils'
import menu from './menu'

// 加载 models
const LoadModalComponent: FC<{ models?: string[]; app: any }> = ({ children, app, models }) => {
    useEffect(() => {
        loadModel(app, models)
    }, [])

    return <Fragment>{children}</Fragment>
}

// 递归渲染路由
const Routes: FC<{ app: any }> = ({ app }) => {
    const renderRoute = (list: any): JSX.Element => {
        const renderRouteDom = list.map(({ path, component, routes, redirect, title = '', models, exact }: RouteList) => {
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
                    exact={typeof exact === 'boolean' ? exact : !hasChild}
                    render={(props: any): JSX.Element => (
                        <LoadModalComponent models={models} app={app}>
                            <ReactDocumentTitle title={title}>
                                <Component {...props} child={routes}>
                                    {hasChild && renderRoute(routes)}
                                </Component>
                            </ReactDocumentTitle>
                        </LoadModalComponent>
                    )}
                />
            )
        })

        return <Switch>{renderRouteDom}</Switch>
    }

    return <Fragment>{renderRoute(menu)}</Fragment>
}

export default Routes
