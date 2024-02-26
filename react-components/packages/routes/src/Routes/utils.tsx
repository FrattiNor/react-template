import { Suspense } from 'react';
import { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router-dom';

import EmptyComponent from './EmptyComponent';
import ErrorBoundary from './ErrorComponent';
import { IndexRouteItem, NoIndexRouteItem, RouteItem } from '../type';

export const getRouteObjectArray = (rs: Array<RouteItem>) => {
    const routeObjArr: Array<RouteObject> = [];

    rs.forEach((item) => {
        const { Component } = item;

        const element = Component ? (
            <Suspense>
                <Component />
            </Suspense>
        ) : (
            <EmptyComponent />
        );

        if ((item as IndexRouteItem).index === true) {
            const itemRes: IndexRouteObject = {
                element,
                index: true,
                ErrorBoundary,
            };
            routeObjArr.push(itemRes);
        } else {
            const { children, path, title } = item as NoIndexRouteItem;
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
