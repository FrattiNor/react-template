import type { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Context from './Context';
import DocumentTitleComponent from './DocumentTitleComponent';
import { getRouteObjectArray } from './utils';

import type { RoutesProps } from '../type';

const Routes: FC<RoutesProps> = ({ routes, basename }) => {
    return (
        <Context.Provider value={{ routes }}>
            <RouterProvider
                router={createBrowserRouter(
                    getRouteObjectArray([{ path: '/', menuType: 'layout' as const, Component: DocumentTitleComponent, children: routes }]),
                    { basename },
                )}
            />
        </Context.Provider>
    );
};

export default Routes;
