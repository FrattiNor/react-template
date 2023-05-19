import ErrorLayout from '@/layouts/ErrorLayout';
import BasicLayout from '@/layouts/BaseLayout';
import HomeLayout from '@/layouts/HomeLayout';
import Error404 from './Error404Page';
import Error500 from './Error500Page';
import { FC } from 'react';

export type Route = {
    path: string;
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
            {
                path: 'home?',
                Component: HomeLayout,
                children: [
                    {
                        path: 'device?',
                        title: '设备',
                        LazyComponent: () => import('@/pages/Device'),
                    },
                    {
                        path: 'alarm',
                        title: '报警',
                        LazyComponent: () => import('@/pages/Alarm'),
                    },
                    {
                        path: 'knowledge',
                        title: '知识库',
                        LazyComponent: () => import('@/pages/Knowledge'),
                    },
                ],
            },
            {
                path: '/',
                Component: ErrorLayout,
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

export default routes;
