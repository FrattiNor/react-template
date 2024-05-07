import type { CSSProperties, ReactNode } from 'react';

import type useList from './useList';

export type AnyObj = Record<string, any>;

// useTreeVirtualizer
export type VirtualListFieldKeys<T> = {
    key: keyof T;
    label: keyof T;
    disabled?: keyof T | ((v: T) => boolean);
};

export type HandledDataItem<T> = {
    data: T;
    key: string;
    label: string;
    disabled: boolean;
};

export type VirtualListProps<T> = {
    data?: T[];
    loading?: boolean;
    fieldKeys?: VirtualListFieldKeys<T>;
    renderItem?: (item: T, handleData: HandledDataItem<T>, keyword?: string) => ReactNode;

    selectedKey?: string;
    setSelectedKey?: (key: string | undefined, item: T) => void;
    shouldSelectedKeyChange?: (key: string | undefined) => boolean;

    listClassName?: string;
    listStyle?: CSSProperties;
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;

    renderPrefix?: (item: T) => ReactNode;
};

export type VirtualSearchListProps<T> = VirtualListProps<T> & {
    title?: string;
    searchClassName?: string;
    searchStyle?: CSSProperties;
};

export type VirtualListInstance<T extends AnyObj = object> = ReturnType<typeof useList<T>>;

export type VirtualListComponent = <T extends AnyObj>(props: VirtualListProps<T> & React.RefAttributes<VirtualListInstance<T>>) => ReactNode | null;

export type VirtualSearchListComponent = <T extends AnyObj>(
    props: VirtualSearchListProps<T> & React.RefAttributes<VirtualListInstance<T>>,
) => ReactNode | null;
