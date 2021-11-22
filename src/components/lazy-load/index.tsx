import React, { FC, Suspense, ComponentType, lazy } from 'react'

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>, Loading?: FC): FC => {
    const LazyComponent = lazy(loader)

    const Component: FC<any> = (props) => {
        return (
            <Suspense fallback={Loading ? <Loading /> : <div />}>
                <LazyComponent {...props} />
            </Suspense>
        )
    }

    return Component
}

export default LazyLoad
