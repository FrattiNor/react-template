import { Suspense } from 'react';
import type { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router-dom';

import EmptyComponent from './EmptyComponent';
import ErrorBoundary from './ErrorComponent';

import type { RouteHandle, RouteItem } from '../../type';

const joinPaths = (paths: string[]) => {
    return paths
        .map((path) => path.replace(/\?$/, ''))
        .join('/')
        .replace(/\/\/+/g, '/');
};

const getElement = (Component: React.ComponentType | undefined) => {
    return Component ? (
        <Suspense>
            <Component />
        </Suspense>
    ) : (
        <EmptyComponent />
    );
};

const getRouteObjectArray = (rs: Array<RouteItem>, opt?: { beforePathname?: string; beforeIndexs?: number[] }) => {
    const routeObjArr: Array<RouteObject> = [];

    const { beforePathname = '/', beforeIndexs = [] } = opt ?? {};

    rs.forEach((item, index) => {
        const element = getElement(item.Component);
        const indexs = [...beforeIndexs, index];

        if (item.index === true) {
            const handle: RouteHandle = {
                indexs,
                indexRoute: true,
                title: item.title,
                menuType: item.menuType,
                pathname: beforePathname,
                customData: item.customData,
            };

            const itemRes: IndexRouteObject = {
                handle,
                element,
                index: true,
                ErrorBoundary,
            };

            routeObjArr.push(itemRes);
        } else {
            const { children, path } = item;

            const pathname = joinPaths([beforePathname, path]);

            const handle: RouteHandle = {
                indexs,
                pathname,
                title: item.title,
                indexRoute: false,
                menuType: item.menuType,
                customData: item.customData,
            };

            const itemRes: NonIndexRouteObject = {
                path,
                handle,
                element,
                ErrorBoundary,
                children: children ? getRouteObjectArray(children, { beforePathname: pathname, beforeIndexs: indexs }) : undefined,
            };

            routeObjArr.push(itemRes);
        }
    });

    return routeObjArr;
};

export default getRouteObjectArray;
