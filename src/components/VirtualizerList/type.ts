import { ReactNode } from 'react';

export type VirtualizerListProps<T> = {
    data: T[];
    loading?: boolean;
    className?: string;
    borderWidth?: number;
    enableScroll?: boolean;
    scrollClassName?: string;
    enablePullDown?: { refetch: () => Promise<any> };
    rowKey: keyof T | ((item: T, index: number) => string);
    renderItem: (item: T, opt: { key: string; index: number }) => ReactNode;
    enableLoadMore?: { isFetchingNextPage: boolean; hasNextPage: boolean; fetchNextPage: () => Promise<any> };
};

export type ListProps<T> = Omit<VirtualizerListProps<T>, 'loading' | 'className'>;
