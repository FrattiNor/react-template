/* eslint-disable @typescript-eslint/explicit-function-return-type */
// 使用 dva 创建  store
import { create } from 'dva-core'
import createLoading from 'dva-loading'
import { createLogger } from 'redux-logger'
import H from 'history'

const isDev = process.env.NODE_ENV === 'development'

export default (history: H.History<unknown>) => {
    const app = create({
        history,
        onAction: isDev ? [createLogger({ level: 'warn' })] : [],
        onError: (e: any) => {
            console.error('dva拦截', e)
        }
    })

    app.use(createLoading())

    app.start()

    const store = app._store
    app.getStore = () => store

    return app
}
