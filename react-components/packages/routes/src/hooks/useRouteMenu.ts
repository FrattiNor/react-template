import { useMemo } from 'react';

import { nanoid } from 'nanoid';

import useRoutes from './useRoutes';
import { NoIndexRouteItem, RouteItem } from '../type';

const joinPaths = (paths: string[]) => {
    return paths
        .map((path) => path.replace(/\?$/, ''))
        .join('/')
        .replace(/\/\/+/g, '/');
};

type MenuItem = {
    key: string;
    path?: string;
    label: string;
    children?: MenuItem[];
};

type MenuObjItem = {
    parentKeys: string[];
    currentPath: string;
};

type HandleRouteOpt = {
    parentKeys?: string[];
    beforePaths?: string[];
};

const useRouteMenu = () => {
    const { routes } = useRoutes();

    return useMemo(() => {
        const handleRoute = (rs: RouteItem[], opt?: HandleRouteOpt) => {
            let menu: MenuItem[] = [];
            let menuObj: Record<string, MenuObjItem> = {};
            const { beforePaths = ['/'], parentKeys = [] } = opt || {};

            rs.forEach((item) => {
                const { path, children, title } = item as NoIndexRouteItem;
                const currentPaths = [...beforePaths, path ?? '/'];
                const currentPath = joinPaths(currentPaths);

                switch (item.type) {
                    case 'err':
                        break;
                    case 'index':
                        break;
                    case 'layout':
                        if (children) {
                            const { menu: childMenu, menuObj: childMenuObj } = handleRoute(children, {
                                parentKeys: parentKeys,
                                beforePaths: currentPaths,
                            });
                            menu = [...menu, ...childMenu];
                            menuObj = { ...menuObj, ...childMenuObj };
                        }
                        break;
                    case 'group':
                        if (title && children) {
                            const groupKey = nanoid();
                            const { menu: childMenu, menuObj: childMenuObj } = handleRoute(children, {
                                beforePaths: currentPaths,
                                parentKeys: [...parentKeys, groupKey],
                            });
                            menu.push({
                                label: title,
                                key: groupKey,
                                children: childMenu,
                            });
                            menuObj = { ...menuObj, ...childMenuObj };
                        }
                        break;
                    default:
                        if (title) {
                            menu.push({
                                label: title,
                                key: currentPath,
                                path: currentPath,
                            });
                            menuObj[currentPath] = { parentKeys, currentPath };
                            // 如果是结尾?的路径
                            if (/\?$/.test(path ?? '/')) {
                                menuObj[joinPaths(beforePaths)] = { parentKeys, currentPath };
                            }
                        }
                        break;
                }
            });

            return { menu, menuObj };
        };

        return handleRoute(routes);
    }, [routes]);
};

export default useRouteMenu;
