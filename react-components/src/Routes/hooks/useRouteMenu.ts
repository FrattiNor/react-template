import { useMemo } from 'react';

import { nanoid } from 'nanoid';

import useRoutes from './useRoutes';

import type { RouteItem, NonIndexRouteItem } from '../type';

const joinPaths = (paths: string[]) => {
    return paths
        .map((path) => path.replace(/\?$/, ''))
        .join('/')
        .replace(/\/\/+/g, '/');
};

type MenuItem = {
    key: string;
    path: string;
    label: string;
    children?: MenuItem[];
};

type ObjMenuItem = {
    key: string;
    path: string;
    label: string;
    parentKeys: string[];
};

type HandleRouteOpt = {
    parentKeys?: string[];
    beforePath?: string;
};

const handleRoute = (routes: RouteItem[]) => {
    const menuKeyObj: Record<string, ObjMenuItem> = {};
    const menuPathObj: Record<string, ObjMenuItem> = {};

    const recursion = (rs: RouteItem[], opt?: HandleRouteOpt) => {
        let menu: MenuItem[] = [];

        const { beforePath = '/', parentKeys = [] } = opt || {};

        rs.forEach((item) => {
            if (item.menuType !== 'hidden') {
                const key = nanoid();
                const { path, children, title } = item as NonIndexRouteItem;

                // 当前路径
                const currentPaths = [beforePath, path ?? '/'];
                const currentPath = joinPaths(currentPaths);

                // 待插入数据
                const menuItem: MenuItem = {
                    key,
                    path: currentPath,
                    label: title ?? '-',
                };

                const objMenuItem: ObjMenuItem = {
                    key,
                    parentKeys,
                    path: currentPath,
                    label: title ?? '-',
                };

                // 带?的路径
                if (/\?$/.test(path ?? '/')) menuPathObj[beforePath] = objMenuItem;

                // 遍历children
                if (Array.isArray(children) && children.length > 0) {
                    const childMenu = recursion(children, { parentKeys: [...parentKeys, key], beforePath: currentPath });
                    // Layout将children平铺
                    if (item.menuType === 'layout') {
                        menu = [...menu, ...childMenu];
                    } else if (childMenu.length > 0) {
                        menuItem.children = childMenu;
                    }
                }

                // 如果非Layout插入item
                if (item.menuType !== 'layout') {
                    menu.push(menuItem);
                }

                // 非Layout和非Group，插入Obj
                if (item.menuType !== 'layout' && item.menuType !== 'group') {
                    menuKeyObj[key] = objMenuItem;
                    menuPathObj[currentPath] = objMenuItem;
                }
            }
        });

        return menu;
    };

    const menu = recursion(routes);

    return {
        menu,
        menuKeyObj,
        menuPathObj,
    };
};

const useRouteMenu = () => {
    const { routes } = useRoutes();
    return useMemo(() => handleRoute(routes), [routes]);
};

export default useRouteMenu;
