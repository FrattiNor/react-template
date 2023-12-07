import { CSSProperties, ReactNode, RefObject } from 'react';

export type AnyObj = Record<string, any>;

export type TableProps<T> = {
    rowKey: keyof T;
    dataSource?: T[];
    loading?: boolean;
    columns: Column<T>[];
    autoScrollTop?: boolean;
};

export type Column<T> = {
    key: string;
    flex?: number;
    width?: number;
    title: ReactNode;
    fixed?: 'left' | 'right';
    align?: 'left' | 'right' | 'center';
    render?: (v: T) => ReactNode;
};

export type HandledColumn<T> = Omit<Column<T>, 'width'> & {
    flex: number;
    index: number;
    width: number;
    showShadow?: boolean;
    fixedStyle?: CSSProperties;
    headFixedStyle?: CSSProperties;
};

export type TableRef = {
    headElement: RefObject<HTMLDivElement | null>;
    bodyElement: RefObject<HTMLDivElement | null>;
    scrollTo: (conf: ScrollToOptions) => void;
};
