import { Suspense } from 'react';
import type { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router-dom';

import EmptyComponent from './EmptyComponent';
import ErrorBoundary from './ErrorComponent';
import type { RouteItem } from '../type';

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
        const element = getElement(item.Component);

        const title = item.menuType !== 'group' && item.menuType !== 'layout' ? item.title : undefined;

        if (item.index === true) {
            const itemRes: IndexRouteObject = {
                index: true,
                element,
                ErrorBoundary,
                handle: { title },
            };
            routeObjArr.push(itemRes);
        } else {
            const { children, path } = item;
            const itemRes: NonIndexRouteObject = {
                path,
                element,
                ErrorBoundary,
                handle: { title },
                children: children ? getRouteObjectArray(children) : undefined,
            };
            routeObjArr.push(itemRes);
        }
    });

    return routeObjArr;
};
