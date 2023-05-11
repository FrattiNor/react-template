import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import EmptyComponent from './EmptyComponent';
import routes, { Route } from './routes';

const getLazy = (LazyComponent: Route['LazyComponent']) => {
    if (LazyComponent) {
        return {
            async lazy() {
                return { Component: (await LazyComponent()).default };
            },
        };
    }
    return {};
};

const convertRoutes = (rs: Array<Route>): Array<RouteObject> => {
    return rs.map(({ path, Component, LazyComponent, children, title }) => {
        const _Component = !Component && !LazyComponent ? EmptyComponent : Component;

        return {
            path,
            Component: _Component,
            ...getLazy(LazyComponent),
            handle: { title: title || '' },
            children: children ? convertRoutes(children) : undefined,
            // loader: (...res) => {
            //     console.log('loader', res);
            //     return Promise.resolve(1);
            // },
        };
    });
};

const Routes = () => {
    return <RouterProvider router={createBrowserRouter(convertRoutes(routes))} />;
};

export default Routes;
