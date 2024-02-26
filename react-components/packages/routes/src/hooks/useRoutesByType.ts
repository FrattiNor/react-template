import { useMemo } from 'react';

import useRoutes from './useRoutes';
import { IndexRouteItem, NoIndexRouteItem, RouteItem } from '../type';

type RouteTypeItem = {
    path: string;
    title?: string;
};

const joinPaths = (paths: string[]) => {
    return paths
        .map((path) => path.replace(/\?$/, ''))
        .join('/')
        .replace(/\/\/+/g, '/');
};

const useRoutesByType = () => {
    const { routes } = useRoutes();

    return useMemo(() => {
        const routeTypes: Record<string, RouteTypeItem[]> = {};

        const handleRouteArr = (rs: RouteItem[], beforePath = '/') => {
            rs.forEach((item) => {
                if ((item as IndexRouteItem).index !== true) {
                    const { type = 'null', path, children, title, hidden } = item as NoIndexRouteItem;
                    if (!routeTypes[type]) routeTypes[type] = [];
                    const currentPath = joinPaths([beforePath, path]);
                    if (hidden !== true) {
                        routeTypes[type].push({
                            title,
                            path: currentPath,
                        });
                        if (children) handleRouteArr(children, currentPath);
                    }
                }
            });
        };

        handleRouteArr(routes);
        return routeTypes;
    }, [routes]);
};

export default useRoutesByType;
