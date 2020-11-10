import { ComponentType, FC } from 'react'
import Empty from '@/components/empty_component'
import ReactLoadable from './react_loadable'
import ReactLazyLoad from './react_lazy'

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>, type: 'react' | 'loadable'): FC => {
    switch (type) {
        case 'react':
            return ReactLazyLoad(loader)
        case 'loadable':
            return ReactLoadable(loader)
        default:
            return Empty
    }
}

export default LazyLoad
