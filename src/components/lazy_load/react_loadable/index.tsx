import React, { FC, ComponentType } from 'react'
import Loadable from 'react-loadable'

// 加载时显示的dom
const Loading: FC = () => <div>Loading...</div>

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>) =>
    Loadable({
        loader,
        loading: Loading
    })

export default LazyLoad
