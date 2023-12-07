import { CSSProperties, ReactNode } from 'react';

export type AnyObj = Record<string, any>;

export type TableProps<T> = {
    rowKey: keyof T;
    dataSource?: T[];
    loading?: boolean;
    columns: Column<T>[];
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

export type FixedColumn<T> = Array<
    Omit<Column<T>, 'width'> & {
        width: number;
        showShadow?: boolean;
        fixedStyle?: CSSProperties;
        headFixedStyle?: CSSProperties;
    }
>;

export type TableRef = {
    headElement: HTMLDivElement | null;
    bodyElement: HTMLDivElement | null;
    scrollTo: (conf: ScrollToOptions) => void;
};
