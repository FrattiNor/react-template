import { ReactNode } from 'react';
import { Query } from '../type';

export type ListProps<T> = {
    query: Query<T>;
    enableVisible?: boolean;
    rowKey: keyof T | ((item: T, index: number) => string);
    renderItem: (item: T, opt: { visible: boolean; index: number; key: string }) => ReactNode;
};
