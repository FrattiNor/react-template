import type { ComponentType } from 'react';

export type IndexRouteItem = {
    index: true;
    title?: string; // 标题
    Component?: ComponentType; // 组件
    menuType?: 'layout' | 'group' | 'hidden';
};

export type NonIndexRouteItem = {
    index?: false;
    path: string; // 路径
    title?: string; // 标题
    Component?: ComponentType; // 组件
    children?: Array<RouteItem>; // 子路由
    menuType?: 'layout' | 'group' | 'hidden';
};
export type RouteItem = IndexRouteItem | NonIndexRouteItem;

export type RouteItems = Array<RouteItem>;

export type RoutesProps = {
    routes: RouteItems;
    basename?: string;
};
