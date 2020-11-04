import React, { FC, Suspense, ComponentType, lazy } from 'react'

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>) => {
    const Component: FC = (props) => {
        const LazyComponent = lazy(loader)

        return (
            <Suspense fallback={<div>loading...</div>}>
                <LazyComponent {...props} />
            </Suspense>
        )
    }

    return Component
}

export default LazyLoad
