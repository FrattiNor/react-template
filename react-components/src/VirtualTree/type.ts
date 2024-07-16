import type { CSSProperties, ReactNode } from 'react';

import type useTree from './useTree';

export type AnyObj = Record<string, any>;

// useTreeVirtualizer
export type VirtualTreeFieldKeys<T> = {
    key: keyof T;
    label: keyof T;
    children: keyof T;
    disabled?: keyof T | ((v: T) => boolean);
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

export type VirtualTreeProps<T> = {
    data?: T[];
    loading?: boolean;
    fieldKeys?: VirtualTreeFieldKeys<T>;
    renderItem?: (item: T, handleData: HandledDataItem<T>, keyword?: string) => ReactNode;

    selectedKey?: string;
    setSelectedKey?: (key: string | undefined, item: T) => void;
    shouldSelectedKeyChange?: (key: string | undefined) => boolean;
    visibles?: Record<string, boolean>;
    setVisibles?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    defaultVisibles?: Record<string, boolean>;
    defaultVisibleLevel?: number; // 默认展开层级

    treeClassName?: string;
    treeStyle?: CSSProperties;
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;

    renderPrefix?: (item: T) => ReactNode;
};

export type VirtualSearchTreeProps<T> = VirtualTreeProps<T> & {
    title?: string;
    searchClassName?: string;
    searchStyle?: CSSProperties;
};

export type VirtualTreeInstance<T extends AnyObj = object> = ReturnType<typeof useTree<T>>;

export type VirtualTreeComponent = <T extends AnyObj>(props: VirtualTreeProps<T> & React.RefAttributes<VirtualTreeInstance<T>>) => ReactNode | null;

export type VirtualSearchTreeComponent = <T extends AnyObj>(
    props: VirtualSearchTreeProps<T> & React.RefAttributes<VirtualTreeInstance<T>>,
) => ReactNode | null;
