import { CSSProperties, ReactNode, RefObject } from 'react';

export type AnyObj = Record<string, any>;

export type Fixed = 'left' | 'right' | 'default';

export type Align = 'left' | 'right' | 'center';

export type Column<T> = {
    key: string;
    fixed?: Fixed;
    align?: Align;
    width?: number;
    resize?: boolean;
    title: ReactNode;
    flexGrow?: number;
    hiddenDivider?: boolean;
    render?: (item: T, index: number) => ReactNode;
};

export type RowSelection<T> = {
    fixed?: Fixed;
    width?: number;
    selectedRowKeys?: (string | number)[];
    onChange?: (v: (string | number)[]) => void;
    getCheckboxProps?: (item: T, index: number) => { disabled: boolean };
};

export type Expandable = {
    fixed?: Fixed;
    width?: number;
    childrenColumnName?: string;
    expandedRowKeys?: (string | number)[];
    onChange?: (v: (string | number)[]) => void;
};

export type TableProps<T> = {
    rowKey: keyof T;
    dataSource?: T[];
    loading?: boolean;
    rowHeight?: number;
    columns: Column<T>[];
    expandable?: Expandable;
    autoScrollTop?: boolean;
    rowSelection?: RowSelection<T>;
};

export type HandledColumn<T> = Omit<Column<T>, 'width' | 'flexGrow'> & {
    width: number;
    index: number;
    measureStyle: CSSProperties;
};

export type TableRef = {
    headElement: RefObject<HTMLDivElement | null>;
    bodyElement: RefObject<HTMLDivElement | null>;
    scrollTo: (conf: ScrollToOptions) => void;
};
