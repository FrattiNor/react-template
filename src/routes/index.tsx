import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getRouteObjectArray } from './utils';
import routes from './routes';

const Routes = () => {
    return <RouterProvider router={createBrowserRouter(getRouteObjectArray(routes))} />;
};

export default Routes;
