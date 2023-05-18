import { FilterProps } from './components/Filter/type';
import { ListProps } from './components/List/type';
import { useInfiniteList } from '@/hooks';
import { PartialKeys } from '@/global';

export type Query<T> = ReturnType<typeof useInfiniteList<T>>;

export type WrapperProps<T> = ListProps<T> & {
    filter?: PartialKeys<Omit<FilterProps, 'params' | 'setParams'>, 'filterList'>;
};
