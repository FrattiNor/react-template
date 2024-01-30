import { CSSProperties, ReactNode } from 'react';

import useList from './useList';

export type AnyObj = Record<string, any>;

// useTreeVirtualizer
export type VirtualListFieldKeys<T> = {
    key: keyof T;
    label: keyof T;
    disabled?: keyof T | ((v: T) => boolean);
};

export type VirtualListProps<T> = {
    data: T[];
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
    fieldKeys?: VirtualListFieldKeys<T>;
    renderItem?: (data: T, handleData: HandledDataItem<T>) => ReactNode;
    multipleSelect?: boolean;
    select?: 'checkbox' | 'label';
    selectedKeys?: string[];
    setSelectedKeys?: (keys: string[]) => void;
    shouldSelectedKeysChange?: (keys: string[]) => boolean;
};

type VirtualListInstance<T extends AnyObj> = ReturnType<typeof useList<T>>;

export type VirtualListRef = {
    getInstance: <T extends AnyObj>() => VirtualListInstance<T>;
};

export type HandledDataItem<T> = {
    data: T;
    key: string;
    label: string;
    disabled: boolean;
};
