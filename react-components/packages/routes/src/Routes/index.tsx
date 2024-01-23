import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getRouteObjectArray } from './utils';
import { RoutesProps } from '../type';
import { FC } from 'react';

const Routes: FC<RoutesProps> = ({ routes }) => {
    return <RouterProvider router={createBrowserRouter(getRouteObjectArray(routes))} />;
};

export default Routes;
