import { CSSProperties, ReactNode, RefObject } from 'react';

export type AnyObj = Record<string, any>;

export type Fixed = 'left' | 'right';

export type Align = 'left' | 'right' | 'center';

export type Column<T> = {
    key: string;
    fixed?: Fixed;
    align?: Align;
    width?: number;
    resize?: boolean;
    title: ReactNode;
    flexGrow?: number;
    render?: (v: T, index: number) => ReactNode;
};

export type RowSelection<T> = {
    fixed?: Fixed;
    width?: number;
    selectedRowKeys?: (string | number)[];
    onChange?: (v: (string | number)[]) => void;
    getCheckboxProps?: (item: T) => { disabled: boolean };
};

export type TableProps<T> = {
    rowKey: keyof T;
    dataSource?: T[];
    loading?: boolean;
    rowHeight?: number;
    columns: Column<T>[];
    autoScrollTop?: boolean;
    rowSelection?: RowSelection<T>;
};

export type HandledColumn<T> = Omit<Column<T>, 'width' | 'flexGrow'> & {
    index: number;
    width: number;
    showShadow?: boolean;
    widthStyle: CSSProperties;
    fixedStyle?: CSSProperties;
    headFixedStyle?: CSSProperties;
};

export type TableRef = {
    headElement: RefObject<HTMLDivElement | null>;
    bodyElement: RefObject<HTMLDivElement | null>;
    scrollTo: (conf: ScrollToOptions) => void;
};
