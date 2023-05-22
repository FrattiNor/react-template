import { WrapperProps } from '../InfiniteList/Wrapper/type';

export type ListItem<T> = WrapperProps<T> & { title: string };

export type Props<T> = {
    items: Array<ListItem<T>>;
};
