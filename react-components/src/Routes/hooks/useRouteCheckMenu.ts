import { useMemo } from 'react';
import { type RouteObject } from 'react-router-dom';

import useRoutes from './useRoutes';
import { type RouteHandle } from '../type';

type MenuItem = {
	path: string;
	label: string;
};

type Option = { handleTitle?: (title: string) => string };

const handleRoute = (routes: RouteObject[], opt?: Option) => {
	const menu: MenuItem[] = [];

	const { handleTitle } = opt ?? {};

	const recursion = (rs: RouteObject[]) => {
		rs.forEach((item) => {
			const { menuType, title, pathname, indexRoute } = item.handle as RouteHandle;

			if (menuType !== 'hidden' && indexRoute !== true) {
				const { children } = item;

				// 待插入数据
				const menuItem: MenuItem = {
					path: pathname,
					label: handleTitle ? handleTitle(title ?? '-') : (title ?? '-'),
				};

				// 如果非Layout插入item
				if (menuType !== 'layout' && menuType !== 'group') {
					menu.push(menuItem);
				}

				// 遍历children
				if (Array.isArray(children) && children.length > 0) {
					recursion(children);
				}
			}
		});

		return menu;
	};

	recursion(routes);

	return { menu };
};

const useRouteCheckMenu = (opt?: Option) => {
	const { routeObjects } = useRoutes();

	const { menu } = useMemo(() => handleRoute(routeObjects, opt), [routeObjects]);

	return { menu };
};

export default useRouteCheckMenu;
