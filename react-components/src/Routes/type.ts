import type { ComponentType } from 'react';

type MenuType = 'layout' | 'group' | 'hidden';

export type IndexRouteItem = {
    index: true;
    title?: string; // 标题
    Component?: ComponentType; // 组件
    menuType?: MenuType;
    customData?: any;
};

export type NonIndexRouteItem = {
    index?: false;
    path: string; // 路径
    title?: string; // 标题
    Component?: ComponentType; // 组件
    children?: Array<RouteItem>; // 子路由
    menuType?: MenuType;
    customData?: any;
};

export type RouteItem = IndexRouteItem | NonIndexRouteItem;

export type RouteItems = Array<RouteItem>;

export type RoutesProps = {
    routes: RouteItems;
    basename?: string;
};

export type RouteHandle = {
    title?: string;
    indexRoute: boolean;
    indexs: number[];
    menuType?: MenuType;
    pathname: string;
    customData?: any;
};
