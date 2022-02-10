// import asyncImport from '@/hocs/async-import'
import { isString } from '@/utils/judge-type'
import EmptyComponent from '@/components/empty-component'

// 加载 dva_model
const loadModel = (app: any, models?: string[]): any => {
    models?.forEach((road) => {
        try {
            const modelRoad = isString(road) ? road : ''
            const model = require(`@/models/${modelRoad}`).default
            const inModels = app._models.some(({ namespace }: { namespace: string }) => namespace === model.namespace)
            if (!inModels) {
                app.model(model)
            }
        } catch (e) {
            console.error(e)
            console.error(`models 路径不正确 ${road}`)
        }
    })
}

// 获取组件本体
const getComponent = (component: any): any => {
    if (component) {
        return component.default || component
    } else {
        return EmptyComponent
    }
}

// 和 lazyLoad 统一格式
// todo一些load相关操作
const requireLoad = (load: () => any) => {
    return load()
}

export { loadModel, getComponent, requireLoad }
