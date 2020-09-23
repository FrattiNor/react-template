// 使用 dva 创建  store
import { create } from 'dva-core'
import createLoading from 'dva-loading'

export default () => {
    const app = create({
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
