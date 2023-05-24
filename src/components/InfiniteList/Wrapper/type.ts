import useInfiniteQuery2 from '@/hooks/useInfiniteQuery2';
import { FilterProps } from '../Filter/type';
import { FloatProps } from '../Float/type';
import { ListProps } from '../List/type';
import { PartialKeys } from '@/global';

export type InfiniteQuery2<T> = ReturnType<typeof useInfiniteQuery2<T>>;

export type WrapperProps<T> = ListProps<T> & {
    filter?: PartialKeys<Omit<FilterProps, 'params' | 'addAndDelParams'>, 'filterList'>;
} & {
    float?: Partial<FloatProps<T>>;
};
