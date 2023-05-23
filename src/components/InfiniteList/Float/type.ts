import { CSSProperties, FC, PropsWithChildren } from 'react';
import { InfiniteQuery2 } from '../Wrapper/type';

export type FloatProps<T> = PropsWithChildren<{
    style?: CSSProperties;
    position?: 'absolute' | 'fixed';
    render?: FC<InfiniteQuery2<T>>;
}>;
