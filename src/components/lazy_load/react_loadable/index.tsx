import { FC, ComponentType } from 'react'
import Loadable from 'react-loadable'
import Loading from '@/components/lazy_load/loading'

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>): FC =>
    Loadable({
        loader,
        loading: Loading
    })

export default LazyLoad
