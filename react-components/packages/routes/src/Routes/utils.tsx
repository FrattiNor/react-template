import { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router-dom';
import { IndexRouteItem, NoIndexRouteItem, RouteItem } from '../type';
import EmptyComponent from './EmptyComponent';
import ErrorBoundary from './ErrorComponent';
import { Suspense } from 'react';

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
                handle: { index: true },
            };
            routeObjArr.push(itemRes);
        } else if ((item as NoIndexRouteItem).hidden !== true) {
            const { type, children, path, title, hiddenInMenu } = item as NoIndexRouteItem;
            const itemRes: NonIndexRouteObject = {
                path,
                element,
                ErrorBoundary,
                handle: { title, type, hiddenInMenu },
                children: children ? getRouteObjectArray(children) : undefined,
            };
            routeObjArr.push(itemRes);
        }
    });

    return routeObjArr;
};
