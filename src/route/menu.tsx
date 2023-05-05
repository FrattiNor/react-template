import LazyLoad from './LazyLoad';

export type RouteItem = {
    path: string;
    component?: any;
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
