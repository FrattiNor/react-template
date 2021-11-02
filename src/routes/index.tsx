interface RouteList {
    path?: string
    component?: any
    routes?: any[]
    redirect?: string
    title?: string
    models?: string[]
}

import React, { Fragment } from 'react'
import ReactDocumentTitle from 'react-document-title'
import { Route, Switch, Redirect } from 'react-router-dom'
import { loadModel, getComponent } from './utils'
import menu from './menu'

type RenderModelsProps = {
    app: any
    models?: string[]
}

class RenderModels extends React.PureComponent<RenderModelsProps, {}> {
    constructor(props: RenderModelsProps) {
        super(props)
        if (this.props.models) loadModel(this.props.app, this.props.models)
        this.state = {}
    }
    render() {
        return <Fragment>{this.props.children}</Fragment>
    }
}

// 递归渲染路由
const Routes = ({ app }: { app: any }): JSX.Element => {
    const renderRoute = (list: any): JSX.Element => {
        const renderRouteDom = list.map(({ path, component, routes, redirect, title = '', models }: RouteList) => {
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
                            <RenderModels app={app} models={models}>
                                <Component {...props} child={routes}>
                                    {hasChild && renderRoute(routes)}
                                </Component>
                            </RenderModels>
                        </ReactDocumentTitle>
                    )}
                />
            )
        })

        return <Switch>{renderRouteDom}</Switch>
    }

    return <Fragment>{renderRoute(menu)}</Fragment>
}

export default Routes
