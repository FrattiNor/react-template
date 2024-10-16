import type useTree from './index';
import type useWithDefaultProps from './useWithDefaultProps';

export type WithDefaultVirtualTreeProps<T, K> = ReturnType<typeof useWithDefaultProps<T, K>>;

export type TreeInstance<T, K> = ReturnType<typeof useTree<T, K>>;
