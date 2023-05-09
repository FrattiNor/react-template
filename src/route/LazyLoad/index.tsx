/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FC, ComponentType } from 'react';
import { Suspense, lazy } from 'react';

function LazyLoad<T>(loader: () => Promise<{ default: ComponentType<T> }>, Loading?: FC): FC<T> {
    const LazyComponent = lazy(loader);

    const Component: FC<T> = (props) => {
        return (
            <Suspense fallback={Loading ? <Loading /> : <div />}>
                {/* @ts-ignore */}
                <LazyComponent {...props} />
            </Suspense>
        );
    };

    return Component;
}

export default LazyLoad;
