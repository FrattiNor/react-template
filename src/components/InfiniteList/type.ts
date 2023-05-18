import { FilterProps } from './components/Filter/type';
import { ListProps } from './components/List/type';
import { useInfiniteQuery2 } from '@/hooks';
import { PartialKeys } from '@/global';

export type Query<T> = ReturnType<typeof useInfiniteQuery2<T>>;

export type WrapperProps<T> = ListProps<T> & {
    filter?: PartialKeys<Omit<FilterProps, 'params' | 'setParams'>, 'filterList'>;
};
