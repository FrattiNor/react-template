import React, { FC, Suspense, ComponentType, lazy } from 'react'
import Loading from '@/components/lazy_load/loading'

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>): FC => {
    const Component: FC = (props) => {
        const LazyComponent = lazy(loader)

        return (
            <Suspense fallback={<Loading />}>
                <LazyComponent {...props} />
            </Suspense>
        )
    }

    return Component
}

export default LazyLoad
