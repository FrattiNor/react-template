import { ComponentType } from 'react';

export type GroupRouteItem = {
    type: 'group'; // group类型，计算Menu时，作为SubMenu，在标题处跳过
    title?: string; // 标题
    children?: Array<RouteItem>; // 子路由
};

export type IndexRouteItem = {
    type: 'index'; // index 类型，为index路由，不计算Menu
    Component?: ComponentType;
};

export type NoIndexRouteItem = {
    type?: 'layout' | 'err'; // layout类型，计算Menu时跳过自己，err类型，计算Menu时跳过自己，跳过children
    path: string; // 路径
    title?: string; // 标题
    Component?: ComponentType; // 组件
    children?: Array<RouteItem>; // 子路由
};

export type RouteItem = IndexRouteItem | NoIndexRouteItem | GroupRouteItem;

export type RouteItems = Array<RouteItem>;

export type RoutesProps = {
    routes: RouteItems;
};
