import { ComponentType } from 'react';

export type IndexRouteItem = {
    index?: boolean;
    Component?: ComponentType;
};

export type NoIndexRouteItem = {
    path: string; // 路径
    type?: string; // 类别
    // icon?: string; // 图标
    title?: string; // 标题
    hidden?: boolean; // 隐藏
    hiddenInMenu?: boolean; // 菜单隐藏
    Component?: ComponentType; // 组件
    children?: Array<RouteItem>; // 子路由
};

export type RouteItem = IndexRouteItem | NoIndexRouteItem;

export type RoutesProps = {
    routes: RouteItem[];
};
