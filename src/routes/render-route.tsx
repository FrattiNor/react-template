export interface RouteList {
    path?: string
    component?: any
    routes?: any[]
    redirect?: string
    title?: string
    models?: string[]
    exact?: boolean
}

import React, { FC, Fragment, useMemo } from 'react'
import ReactDocumentTitle from 'react-document-title'
import { Route, Switch, Redirect } from 'react-router-dom'
import { loadModel, getComponent } from './utils'
import { isBoolean } from '@/utils/judge-type'
import ErrorCatch from './error-catch'

type RenderRouteProps = {
    menu: any
    app: any
}

type RenderModelsProps = {
    app: any
    models?: string[]
}

class RenderModels extends React.PureComponent<RenderModelsProps, {}> {
    constructor(props: RenderModelsProps) {
        super(props)
        loadModel(this.props.app, this.props.models)
        this.state = {}
    }
    render() {
        return <Fragment>{this.props.children}</Fragment>
    }
}

// 递归渲染路由
const RenderRoute: FC<RenderRouteProps> = ({ app, menu }) => {
    const renderRoute = (list: any): JSX.Element => {
        const renderRouteDom = list.map(({ path, component, routes, redirect, title = '', models, exact }: RouteList) => {
            // if (models) loadModel(app, models)
            // 重定向
            if (redirect) {
                if (path) {
                    return <Redirect key={`redirect+${redirect}+${path}`} path={path} exact to={redirect} />
                } else {
                    return <Redirect key={`redirect+${redirect}`} to={redirect} />
                }
            }

            // 渲染route
            const Component = getComponent(component)
            // 权限子列表 todo
            const childListHaveAuthority = Array.isArray(routes) && routes.filter(() => true)
            // 去 redirect 和 hidden 子列表
            const childListNoRedirectNoHidden =
                Array.isArray(childListHaveAuthority) &&
                childListHaveAuthority.filter((item) => {
                    const noRedirect = !item.redirect
                    const noHidden = !item.hidden
                    return noRedirect && noHidden
                })

            // 是否有child
            const haveRenderChild = Array.isArray(childListHaveAuthority) && childListHaveAuthority.length > 0

            return (
                <Route
                    key={path}
                    path={path}
                    exact={isBoolean(exact) ? exact : !haveRenderChild}
                    render={(props: any): JSX.Element => (
                        <ErrorCatch>
                            <RenderModels app={app} models={models}>
                                <ReactDocumentTitle title={title}>
                                    <Component {...props} childList={childListNoRedirectNoHidden}>
                                        {haveRenderChild && renderRoute(childListHaveAuthority)}
                                    </Component>
                                </ReactDocumentTitle>
                            </RenderModels>
                        </ErrorCatch>
                    )}
                />
            )
        })

        return <Switch>{renderRouteDom}</Switch>
    }

    return useMemo(() => renderRoute(menu), [menu])
}

export default RenderRoute
