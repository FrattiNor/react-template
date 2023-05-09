import LazyLoad from './LazyLoad';
import type { FC } from 'react';

export type RouteItem = {
    path: string;
    component?: FC;
    title?: string;
    devTitle?: string;
    routes?: RouteItem[];
    redirect?: string;
    use?: boolean;
};

const menu: RouteItem[] = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        title: '主页',
        component: LazyLoad(() => import('@/pages/home')),
    },
];

export default menu;
