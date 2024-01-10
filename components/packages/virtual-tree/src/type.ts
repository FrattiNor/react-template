import { CSSProperties, ReactNode } from 'react';
import useTree from './useTree';

export type AnyObj = Record<string, any>;

// useTreeVirtualizer
export type VirtualTreeFieldKeys<T> = {
    key: keyof T;
    label: keyof T;
    children: keyof T;
};

export type VirtualTreeProps<T> = {
    data: T[];
    loading?: boolean;
    className?: string;
    wrapperClassName?: string;
    style?: CSSProperties;
    wrapperStyle?: CSSProperties;
    fieldKeys?: VirtualTreeFieldKeys<T>;
    renderItem?: (data: T, handleData: HandledDataItem<T>) => ReactNode;
};

type VirtualTreeInstance<T extends AnyObj> = ReturnType<typeof useTree<T>>;

export type VirtualTreeRef = {
    getInstance: <T extends AnyObj>() => VirtualTreeInstance<T>;
};

export type HandledDataItem<T> = {
    data: T;
    key: string;
    label: string;
    level: number;
    isLeaf: boolean;
    visible: boolean;
};
