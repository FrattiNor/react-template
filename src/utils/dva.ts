/**
 * @description 使用 dva 创建  store
 */

import { message } from 'antd'
import { create } from 'dva-core'
import createLoading from 'dva-loading'
import { createLogger } from 'redux-logger'
import { isFunction, isObject, isString } from './judge-type'
import H from 'history'

const env = process.env.NODE_ENV || 'development'

// 使用代理模式扩展 history 对象的 listen 方法，添加了一个回调函数做参数并在路由变化是主动调用
function patchHistory(history: H.History<unknown>): any {
    const oldListen = history.listen
    history.listen = (callback: any): any => {
        callback(history.location)
        return oldListen.call(history, callback)
    }
    return history
}

export default (history: H.History<unknown>): any => {
    console.log('==== dva ==== start ====')

    const app = create(
        {
            onAction: env === 'development' ? [createLogger({ level: 'warn' })] : [],
            onError: (e: any) => {
                if (isObject(e)) {
                    // 调用error弹出消息
                    if (e.errorMessage && isString(e.errorMessage)) message.error(e.errorMessage)
                    // 调用routeControl跳转路由
                    if (e.routeControl && isFunction(e.routeControl)) e.routeControl(history)
                }
            }
        },
        {
            setupApp(app: any) {
                app._history = patchHistory(history)
            }
        }
    )

    app.use(createLoading())

    app.start()

    const store = app._store
    app.getStore = (): any => store

    return app
}
