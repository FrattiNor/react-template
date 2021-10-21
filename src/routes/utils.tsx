import asyncImport from '@/hoc/async-import'
import { isPromise } from '@/utils/judge-type'
import EmptyComponent from '@/components/empty-component'

// 加载 dva_model
const loadModel = (models: string[], app: any): void => {
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
    if (component) {
        if (isPromise(component)) {
            return asyncImport(component)
        } else {
            return component.default || component
        }
    } else {
        return EmptyComponent
    }
}

export { loadModel, getComponent }
