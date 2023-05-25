import { InfiniteQuery2 } from '../Wrapper/type';
import { ReactNode } from 'react';

export type ListProps<T> = {
    // 是否需要item自带padding
    itemPadding?: boolean;
    query: InfiniteQuery2<T>;
    enableVisible?: boolean;
    rowKey: keyof T | ((item: T, index: number) => string);
    renderItem: (item: T, opt: { visible: boolean; index: number; key: string }) => ReactNode;
};
