import { useInfiniteList } from '@/hooks';
import { ReactNode } from 'react';

export type Props<T> = {
    query: ReturnType<typeof useInfiniteList<T>>;
    rowKey: keyof T | ((item: T, index: number) => string);
    renderItem: (item: T, visible: boolean, index: number) => ReactNode;
    enableVisible?: boolean;
};
