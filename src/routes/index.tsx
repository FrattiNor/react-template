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
import asyncComponent from '@/hoc_components/async_component'
import { isPromise } from '@/utils/judge'
import {
    Route,
    Switch,
    Redirect,
    // HashRouter as Router
    // BrowserRouter as Router,
    Router
} from 'react-router-dom'
import menu from './menu'

const history = createBrowserHistory()

// 加载 dva_model
const loadModel = (models: string[], app: any) => {
    models.forEach((road) => {
        try {
            const model = require(`@/models/${road}`).default
            const inModels = app._models.some(({ namespace }: { namespace: string }) => namespace === model.namespace)
            if (!inModels) {
                app.model(model)
            }
        } catch (e) {
            console.error(`models 路径不正确 ${road}`)
            console.error(e)
        }
    })
}

// 获取组件本体
const getComponent = (component: any): any => {
    if (isPromise(component)) {
        return asyncComponent(component)
    } else {
        return component.default || component
    }
}

// 递归渲染路由
const Routes = ({ app }: { app: any }) => {
    const renderRoute = (list: any) => {
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
                    render={(props: any) => (
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
