import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getRouteObjectArray } from './utils';
import { RoutesProps } from '../type';
import Context from './Context';
import { FC } from 'react';

const Routes: FC<RoutesProps> = ({ routes }) => {
    return (
        <Context.Provider value={{ routes }}>
            <RouterProvider router={createBrowserRouter(getRouteObjectArray(routes))} />
        </Context.Provider>
    );
};

export default Routes;
