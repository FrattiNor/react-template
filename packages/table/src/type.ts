import { CSSProperties, ReactNode, RefObject } from 'react';

export type AnyObj = Record<string, any>;

export type Column<T> = {
    key: string;
    width?: number;
    title: ReactNode;
    flexGrow?: number;
    fixed?: 'left' | 'right';
    align?: 'left' | 'right' | 'center';
    render?: (v: T, index: number) => ReactNode;
};

export type RowSelection = {
    width?: number;
    rowKeys?: (string | number)[];
    onChange?: (v: (string | number)[]) => void;
};

export type TableProps<T> = {
    rowKey: keyof T;
    dataSource?: T[];
    loading?: boolean;
    columns: Column<T>[];
    autoScrollTop?: boolean;
    rowSelection?: RowSelection;
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
