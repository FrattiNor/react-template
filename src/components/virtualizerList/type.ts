import { ReactNode } from 'react';

export type VirtualizerListProps<T> = {
    data: T[];
    loading?: boolean;
    className?: string;
    enableScroll?: boolean;
    rowKey: keyof T | ((item: T, index: number) => string);
    renderItem: (item: T, index: number) => ReactNode;
};

export type ListProps<T> = Omit<VirtualizerListProps<T>, 'loading' | 'className'>;
