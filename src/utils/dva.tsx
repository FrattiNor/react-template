/* eslint-disable @typescript-eslint/explicit-function-return-type */
// 使用 dva 创建  store
import { create } from 'dva-core'
import createLoading from 'dva-loading'
import { createLogger } from 'redux-logger'
import H from 'history'

const isDev = process.env.NODE_ENV === 'development'

// 使用代理模式扩展 history 对象的 listen 方法，添加了一个回调函数做参数并在路由变化是主动调用
function patchHistory(history: H.History<unknown>): any {
    const oldListen = history.listen
    history.listen = (callback: any): any => {
        callback(history.location)
        return oldListen.call(history, callback)
    }
    return history
}

export default (history: H.History<unknown>) => {
    const app = create(
        {
            onAction: isDev ? [createLogger({ level: 'warn' })] : [],
            onError: (e: any) => {
                console.error('dva拦截', e)
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
    app.getStore = () => store

    return app
}
