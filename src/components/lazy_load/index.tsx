import { ComponentType } from 'react'
import ReactLoadable from './react_loadable'
import ReactLazyLoad from './react_lazy'

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>, type: 'react' | 'loadable') => {
    switch (type) {
        case 'react':
            return ReactLazyLoad(loader)
        case 'loadable':
            return ReactLoadable(loader)
        default:
            return null
    }
}

export default LazyLoad
