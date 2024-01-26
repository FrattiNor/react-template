import { CSSProperties, ReactNode } from 'react';
import useTree from './useTree';

export type AnyObj = Record<string, any>;

// useTreeVirtualizer
export type VirtualTreeFieldKeys<T> = {
    key: keyof T;
    label: keyof T;
    children: keyof T;
    disabled?: keyof T | ((v: T) => boolean);
};

export type VirtualTreeProps<T> = {
    data: T[];
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
    fieldKeys?: VirtualTreeFieldKeys<T>;
    renderItem?: (data: T, handleData: HandledDataItem<T>) => ReactNode;
    multipleSelect?: boolean;
    // selectStrictly?: boolean; // 状态下节点选择完全受控
    select?: 'checkbox' | 'label';
    selectedKeys?: string[];
    setSelectedKeys?: (keys: string[]) => void;
    shouldSelectedKeysChange?: (keys: string[]) => boolean;
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
    disabled: boolean;
};
