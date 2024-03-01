import { Suspense } from 'react';
import { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router-dom';

import EmptyComponent from './EmptyComponent';
import ErrorBoundary from './ErrorComponent';
import { RouteItem } from '../type';

const getElement = (Component: React.ComponentType | undefined) => {
    return Component ? (
        <Suspense>
            <Component />
        </Suspense>
    ) : (
        <EmptyComponent />
    );
};

export const getRouteObjectArray = (rs: Array<RouteItem>) => {
    const routeObjArr: Array<RouteObject> = [];

    rs.forEach((item) => {
        switch (item.type) {
            case 'group': {
                const { children } = item;
                const itemRes: NonIndexRouteObject = {
                    path: '/',
                    element: <EmptyComponent />,
                    ErrorBoundary,
                    children: children ? getRouteObjectArray(children) : undefined,
                };
                routeObjArr.push(itemRes);
                break;
            }
            case 'index': {
                const element = getElement(item.Component);
                const itemRes: IndexRouteObject = {
                    element,
                    index: true,
                    ErrorBoundary,
                };
                routeObjArr.push(itemRes);
                break;
            }
            default: {
                const element = getElement(item.Component);
                const { children, path, title } = item;
                const itemRes: NonIndexRouteObject = {
                    element,
                    ErrorBoundary,
                    path: path ?? '/',
                    handle: { title },
                    children: children ? getRouteObjectArray(children) : undefined,
                };
                routeObjArr.push(itemRes);
                break;
            }
        }
    });

    return routeObjArr;
};
