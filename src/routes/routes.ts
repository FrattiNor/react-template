import BasicLayout from '@/layouts/BasicLayout';
import HomeLayout from '@/layouts/HomeLayout';
import Error404 from './Error404Page';
import Error500 from './Error500Page';
import { FC } from 'react';

export type Route = {
    path: string;
    type?: string;
    icon?: string;
    Component?: FC<any>;
    LazyComponent?: () => Promise<{ default: FC<any> }>;
    children?: Array<Route>;
    title?: string;
};

const routes: Array<Route> = [
    {
        path: '/',
        Component: BasicLayout,
        children: [
            // 主页
            {
                path: '/',
                type: 'home',
                Component: HomeLayout,
                children: [
                    {
                        path: 'device?',
                        icon: 'device',
                        title: '设备',
                        LazyComponent: () => import('@/pages/Device'),
                    },
                    {
                        path: 'alarm',
                        icon: 'alarm',
                        title: '报警',
                        LazyComponent: () => import('@/pages/Alarm'),
                    },
                    {
                        path: 'knowledge',
                        icon: 'knowledge',
                        title: '知识库',
                        LazyComponent: () => import('@/pages/Knowledge'),
                    },
                ],
            },
            // 次级页面
            {
                path: '/',
                type: 'second',
                children: [
                    {
                        path: 'overview',
                        icon: 'overview',
                        title: '总貌图',
                        LazyComponent: () => import('@/pages/Overview'),
                    },
                ],
            },
            // 详情页面
            {
                path: '/',
                type: 'detail',
                children: [
                    {
                        path: 'device/:deviceId',
                        title: '设备详情',
                        LazyComponent: () => import('@/pages/DeviceDetail'),
                    },
                ],
            },
            // Error页面
            {
                path: '/',
                type: 'error',
                children: [
                    {
                        path: '500',
                        title: '500',
                        Component: Error500,
                    },
                    {
                        path: '*',
                        title: '404',
                        Component: Error404,
                    },
                ],
            },
        ],
    },
];

const getTypeRoutes = () => {
    const homeRoutes: Array<Route> = [];
    const secondRoutes: Array<Route> = [];
    const detailRoutes: Array<Route> = [];
    const errorRoutes: Array<Route> = [];

    const handlePath = (beforePath: string, path: string) => {
        const endSlash = /\/$/.test(beforePath);
        if (path === '/' || path === '') return beforePath + (endSlash ? '' : '/');
        if (/\?/.test(path)) return beforePath + (endSlash ? '' : '/');
        if (!endSlash && !/^\//.test(path)) return beforePath + '/' + path;
        return beforePath + path;
    };

    const getMapRoutes = (rs: Array<Route>, beforePath = '', beforeType = '') => {
        let map: Record<string, Route> = {};
        rs.forEach((item) => {
            const currentPath = handlePath(beforePath, item.path);
            const currentType = item.type ?? beforeType;
            if (item.children) {
                map = { ...map, ...getMapRoutes(item.children, currentPath, currentType) };
            } else {
                const pushItem = { ...item, path: currentPath, type: currentType, Component: undefined };
                map[currentPath] = pushItem;

                switch (currentType) {
                    case 'home':
                        homeRoutes.push(pushItem);
                        break;
                    case 'second':
                        secondRoutes.push(pushItem);
                        break;
                    case 'detail':
                        detailRoutes.push(pushItem);
                        break;
                    case 'error':
                        errorRoutes.push(pushItem);
                        break;
                    default:
                        break;
                }
            }
        });
        return map;
    };

    const mapRoutes = getMapRoutes(routes);

    return { homeRoutes, secondRoutes, detailRoutes, errorRoutes, mapRoutes };
};

export { getTypeRoutes };
export default routes;
