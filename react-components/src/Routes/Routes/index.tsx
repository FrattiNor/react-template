import { type FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Context, { useProvider } from './Context';

import type { RoutesProps } from '../type';

const RoutesFC: FC<RoutesProps> = ({ routes, basename }) => {
    const value = useProvider(routes);

    return (
        <Context.Provider value={value}>
            <RouterProvider router={createBrowserRouter(value.routeObjects, { basename })} />
        </Context.Provider>
    );
};

export default RoutesFC;
