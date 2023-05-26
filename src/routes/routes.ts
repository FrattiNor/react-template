import SecondLayout from '@/layouts/SecondLayout';
import DetailLayout from '@/layouts/DetailLayout';
import ErrorLayout from '@/layouts/ErrorLayout';
import BasicLayout from '@/layouts/BasicLayout';
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
            // 主页
            {
                path: '/',
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
            // 次级页面
            {
                path: '/',
                Component: SecondLayout,
                children: [
                    {
                        path: 'overview',
                        title: '总貌图',
                        LazyComponent: () => import('@/pages/Overview'),
                    },
                ],
            },
            // 详情页面
            {
                path: '/',
                Component: DetailLayout,
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
