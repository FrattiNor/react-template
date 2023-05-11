/* eslint-disable @typescript-eslint/no-explicit-any */
import NormalLayout from '@/layouts/NormalLayout';
import ErrorLayout from '@/layouts/ErrorLayout';
import BasicLayout from '@/layouts/BaseLayout';
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
                path: '/',
                Component: NormalLayout,
                children: [
                    {
                        path: 'home?',
                        title: '主页',
                        LazyComponent: () => import('@/pages/Home'),
                    },
                    {
                        path: 'home2',
                        title: '主页2',
                        LazyComponent: () => import('@/pages/Home2'),
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
