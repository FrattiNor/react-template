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
    {
        path: '/demo',
        title: 'Demo',
        routes: [
            {
                path: '/demo/fixed',
                title: 'fixed',
                component: LazyLoad(() => import('@/demos/fixed')),
            },
            {
                path: '/demo/dynamic',
                title: 'dynamic',
                component: LazyLoad(() => import('@/demos/dynamic')),
            },
            {
                path: '/demo/infiniteScroll',
                title: 'infiniteScroll',
                component: LazyLoad(() => import('@/demos/infiniteScroll')),
            },
            {
                path: '/demo/padding',
                title: 'padding',
                component: LazyLoad(() => import('@/demos/padding')),
            },
            {
                path: '/demo/smoothScroll',
                title: 'smoothScroll',
                component: LazyLoad(() => import('@/demos/smoothScroll')),
            },
            {
                path: '/demo/sticky',
                title: 'sticky',
                component: LazyLoad(() => import('@/demos/sticky')),
            },
            {
                path: '/demo/variable',
                title: 'variable',
                component: LazyLoad(() => import('@/demos/variable')),
            },
        ],
    },
    {
        path: '/demo2',
        title: 'Demo2',
        routes: [
            {
                path: '/demo2/infinite',
                title: 'infinite',
                component: LazyLoad(() => import('@/demos2/infinite')),
            },
        ],
    },
];

export default menu;
