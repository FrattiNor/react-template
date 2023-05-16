import { CSSProperties, ReactNode } from 'react';
import { useInfiniteList } from '@/hooks';
import { PartialKeys } from '@/global';

export type ListProps<T> = {
    query: ReturnType<typeof useInfiniteList<T>>;
    rowKey: keyof T | ((item: T, index: number) => string);
    renderItem: (item: T, visible: boolean, index: number) => ReactNode;
    enableVisible?: boolean;
};

export type FilterProps = {
    enableFilter?: boolean;
    style?: CSSProperties;
    filterList: any[];
    position?: 'absolute' | 'fixed';
};

export type WrapperProps<T> = ListProps<T> & {
    filter?: PartialKeys<FilterProps, 'filterList'>;
};
