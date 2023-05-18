import { Query } from '../../type';
import { ReactNode } from 'react';

export type ListProps<T> = {
    query: Query<T>;
    rowKey: keyof T | ((item: T, index: number) => string);
    renderItem: (item: T, visible: boolean, index: number) => ReactNode;
    enableVisible?: boolean;
};
