import { Query } from '../Wrapper/type';
import { ReactNode } from 'react';

export type ListProps<T> = {
    query: Query<T>;
    enableVisible?: boolean;
    rowKey: keyof T | ((item: T, index: number) => string);
    renderItem: (item: T, opt: { visible: boolean; index: number; key: string }) => ReactNode;
};
