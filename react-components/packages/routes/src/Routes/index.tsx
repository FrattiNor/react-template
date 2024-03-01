import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Context from './Context';
import DocumentTitleComponent from './DocumentTitleComponent';
import { getRouteObjectArray } from './utils';
import { RoutesProps } from '../type';

const Routes: FC<RoutesProps> = ({ routes }) => {
    return (
        <Context.Provider value={{ routes }}>
            <RouterProvider
                router={createBrowserRouter(
                    getRouteObjectArray([
                        {
                            path: '/',
                            type: 'layout',
                            Component: DocumentTitleComponent,
                            children: routes,
                        },
                    ]),
                )}
            />
        </Context.Provider>
    );
};

export default Routes;
