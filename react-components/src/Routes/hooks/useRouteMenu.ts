import { useMemo } from 'react';
import type { RouteObject, UIMatch } from 'react-router-dom';

import useRoutes from './useRoutes';

import type { RouteHandle } from '../type';

type MenuItem = {
    key: string;
    path: string;
    label: string;
    customData?: any;
    children?: MenuItem[];
};

type MenuObj = Record<string, MenuItem>;

const handleRoute = (routes: RouteObject[], needCustomData?: boolean) => {
    const menuObj: MenuObj = {};

    const recursion = (rs: RouteObject[]) => {
        let menu: MenuItem[] = [];

        rs.forEach((item) => {
            const { menuType, title, indexs, pathname, indexRoute, customData } = item.handle as RouteHandle;

            if (menuType !== 'hidden' && indexRoute !== true) {
                const key = indexs.join('-');
                const { children } = item;

                // 待插入数据
                const menuItem: MenuItem = {
                    key,
                    path: pathname,
                    label: title ?? '-',
                };

                if (needCustomData === true) {
                    menuItem.customData = customData;
                }

                // 遍历children
                if (Array.isArray(children) && children.length > 0) {
                    const childMenu = recursion(children);
                    // Layout将children平铺
                    if (menuType === 'layout') {
                        menu = [...menu, ...childMenu];
                    } else if (childMenu.length > 0) {
                        menuItem.children = childMenu;
                    }
                }

                // 如果非Layout插入item
                if (menuType !== 'layout') {
                    menu.push(menuItem);
                }

                // 插入menuObj，方便使用key反查pathname
                menuObj[key] = menuItem;
            }
        });

        return menu;
    };

    const menu = recursion(routes);

    return { menu, menuObj };
};

const useRouteMenu = (props?: { needCustomData?: boolean }) => {
    const { routeObjects } = useRoutes();

    const getKeyAndParentKeysByMatches = (matches: UIMatch<unknown, unknown>[]) => {
        let key: null | string = null;
        const parentKeys: string[] = [];
        [...matches].reverse().forEach((item) => {
            const { indexRoute } = item.handle as RouteHandle;
            if (key === null && indexRoute !== true) {
                key = item.id;
            }
            if (key !== null) {
                parentKeys.push(item.id);
            }
        });
        return { key, parentKeys };
    };

    const { menu, menuObj } = useMemo(() => handleRoute(routeObjects, props?.needCustomData), [routeObjects]);

    return { menu, menuObj, getKeyAndParentKeysByMatches };
};

export default useRouteMenu;
