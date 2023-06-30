import { RouteObject } from 'react-router-dom';
import EmptyComponent from './EmptyComponent';
import ErrorBoundary from './ErrorComponent';
import { CustomRouteItem } from '../type';

const getLazy = (LazyComponent: CustomRouteItem['LazyComponent']) => {
    if (LazyComponent) {
        return {
            async lazy() {
                // console.log(LazyComponent);
                return { Component: (await LazyComponent()).default };
            },
        };
    }
    return {};
};

export const getRouteObjectArray = (rs: Array<CustomRouteItem>): Array<RouteObject> => {
    return rs.map(({ path, Component, LazyComponent, children, title, header }) => {
        const _Component = !Component && !LazyComponent ? EmptyComponent : Component;

        return {
            path,
            ErrorBoundary,
            Component: _Component,
            ...getLazy(LazyComponent),
            children: children ? getRouteObjectArray(children) : undefined,
            handle: { title: title || '', header: header === undefined ? true : header },
        };
    });
};
