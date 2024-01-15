import { CSSProperties, ReactNode, RefObject } from 'react';
import useTable from './useTable';

export type AnyObj = Record<string, any>;

export type TableFixed = 'left' | 'right' | 'default';

export type TableAlign = 'left' | 'right' | 'center';

export type TableColumn<T> = {
    key: string;
    width?: number;
    title: ReactNode;
    resize?: boolean;
    flexGrow?: number;
    fixed?: TableFixed;
    align?: TableAlign;
    render?: (item: T, index: number) => ReactNode;
};

export type TableColumns<T> = TableColumn<T>[];

export type TableProps<T> = {
    dataSource?: T[];
    loading?: boolean;
    rowHeight?: number;
    className?: string;
    style?: CSSProperties;
    calcRowHeight?: number;
    columns: TableColumns<T>;
    onResizeEnd?: () => void;
    rowKey: keyof T | ((v: T) => string);
    virtual?: boolean | 'vertical' | 'horizontal';
};

export type HandledColumn<T> = Omit<TableColumn<T>, 'width' | 'flexGrow'> & {
    width: number;
    index: number;
    measureStyle: CSSProperties;
};

export type TableInstance<T extends AnyObj> = ReturnType<typeof useTable<T>>;

export type TableRef = {
    scrollTo: (conf: ScrollToOptions) => void;
    headElement: RefObject<HTMLDivElement | null>;
    bodyElement: RefObject<HTMLDivElement | null>;
    getInstance: <T extends AnyObj>() => TableInstance<T>;
};
