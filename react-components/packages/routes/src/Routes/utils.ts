import { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router-dom';
import { NoIndexRouteItem, RouteItem } from '../type';
import EmptyComponent from './EmptyComponent';
import ErrorBoundary from './ErrorComponent';

export const getRouteObjectArray = (rs: Array<RouteItem>): Array<RouteObject> => {
    return rs.map((item) => {
        const { Component, path, title, index } = item;
        if (index === true) {
            const itemRes: IndexRouteObject = {
                path,
                index,
                ErrorBoundary,
                handle: { title: title || '' },
                Component: Component ?? EmptyComponent,
            };

            return itemRes;
        } else {
            const { children } = item as NoIndexRouteItem;
            const itemRes: NonIndexRouteObject = {
                path,
                ErrorBoundary,
                handle: { title: title || '' },
                Component: Component ?? EmptyComponent,
                children: children ? getRouteObjectArray(children) : undefined,
            };
            return itemRes;
        }
    });
};
