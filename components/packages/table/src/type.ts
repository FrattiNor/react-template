import { CSSProperties, ReactNode, RefObject } from 'react';
import useTable from './useTable';

export type AnyObj = Record<string, any>;

export type TableFixed = 'left' | 'right' | 'default';

export type TableAlign = 'left' | 'right' | 'center';

export type TablePagination = {
    total?: number;
    current?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
    showTotal?: false | ((total: number) => ReactNode);
    onChange?: (current: number, pageSize: number) => void;
};

export type TableColumn<T> = {
    key: string;
    width?: number;
    title: ReactNode;
    resize?: boolean;
    flexGrow?: number;
    fixed?: TableFixed;
    align?: TableAlign;
    render?: (item: T, index: number) => ReactNode;
    edit?: boolean | ((item: T, index: number) => boolean);
    saveEdit?: (value: string, item: T, index: number) => void;
};

export type TableColumns<T> = TableColumn<T>[];

export type TableRowSelection<T> = {
    width?: number;
    fixed?: TableFixed;
    selectedRowKeys?: (string | number)[];
    onChange?: (v: (string | number)[]) => void;
    getCheckboxProps?: (item: T) => { disabled: boolean };
};

export type TableExpandable = {
    width?: number;
    fixed?: TableFixed;
    childrenColumnName?: string;
    expandedRowKeys?: (string | number)[];
    onChange?: (v: (string | number)[]) => void;
};

export type TableIndex = {
    width?: number;
    align?: TableAlign;
    fixed?: TableFixed;
};

export type TableProps<T> = {
    dataSource?: T[];
    loading?: boolean;
    rowHeight?: number;
    calcRowHeight?: number;
    autoScrollTop?: boolean;
    columns: TableColumns<T>;
    onResizeEnd?: () => void;
    showIndex?: TableIndex | boolean;
    rowKey: keyof T | ((v: T) => string);
    expandable?: TableExpandable | boolean;
    pagination?: TablePagination | boolean;
    virtual?: 'both' | 'vertical' | 'horizontal';
    rowSelection?: TableRowSelection<T> | boolean;
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

export type TableColumnsConfItem = {
    index: number;
    hidden: boolean;
    fixed: TableFixed;
};
