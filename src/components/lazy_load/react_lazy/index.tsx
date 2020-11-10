import React, { FC, Suspense, ComponentType, lazy } from 'react'
import DefaultLoading from '@/components/lazy_load/default_loading'

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>, Loading?: FC): FC => {
    const Component: FC = (props) => {
        const LazyComponent = lazy(loader)

        return (
            <Suspense fallback={Loading ? <Loading /> : <DefaultLoading />}>
                <LazyComponent {...props} />
            </Suspense>
        )
    }

    return Component
}

export default LazyLoad
