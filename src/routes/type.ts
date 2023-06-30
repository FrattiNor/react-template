import { FC } from 'react';

export type CustomRouteItem = {
    path: string;
    icon?: string;
    Component?: FC<any>;
    LazyComponent?: () => Promise<{ default: FC<any> }>;
    children?: Array<CustomRouteItem>;
    title?: string;
    header?: boolean;
};
