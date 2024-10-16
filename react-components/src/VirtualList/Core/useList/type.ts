import type useList from './index';
import type useWithDefaultProps from './useWithDefaultProps';

export type WithDefaultVirtualListProps<T, K> = ReturnType<typeof useWithDefaultProps<T, K>>;

export type ListInstance<T, K> = ReturnType<typeof useList<T, K>>;
