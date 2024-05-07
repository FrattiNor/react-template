/* eslint-disable react-refresh/only-export-components */
import type { FC } from 'react';
import { Suspense, lazy, useEffect, useLayoutEffect } from 'react';

const A = lazy(() => import('./A'));

const BBBB: FC = () => {
    useEffect(() => {
        console.log('EB');
    }, []);

    useLayoutEffect(() => {
        console.log('LB');
    }, []);

    console.log('BB');

    return (
        <Suspense>
            <A />
        </Suspense>
    );
};

export default BBBB;
