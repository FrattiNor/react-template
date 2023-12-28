import { CSSProperties, ReactNode, RefObject } from 'react';

export type AnyObj = Record<string, any>;

export type TableFixed = 'left' | 'right' | 'default';

export type TableAlign = 'left' | 'right' | 'center';

export type TableTheme = 'light' | 'dark';

export type TablePagination = {
    total?: number;
    current?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
    showTotal?: false | ((total: number) => ReactNode);
    onChange?: (current: number, pageSize: number) => void;
};

export type Column<T> = {
    key: string;
    fixed?: TableFixed;
    align?: TableAlign;
    edit?: boolean;
    width?: number;
    resize?: boolean;
    title: ReactNode;
    flexGrow?: number;
    render?: (item: T, index: number) => ReactNode;
    onChange?: (value: string, item: T, index: number) => ReactNode;
};

export type TableRowSelection<T> = {
    fixed?: TableFixed;
    width?: number;
    selectedRowKeys?: (string | number)[];
    onChange?: (v: (string | number)[]) => void;
    getCheckboxProps?: (item: T) => { disabled: boolean };
};

export type TableExpandable = {
    fixed?: TableFixed;
    width?: number;
    childrenColumnName?: string;
    expandedRowKeys?: (string | number)[];
    onChange?: (v: (string | number)[]) => void;
};

export type TableProps<T> = {
    theme?: TableTheme;
    rowKey: keyof T;
    dataSource?: T[];
    loading?: boolean;
    rowHeight?: number;
    columns: Column<T>[];
    calcRowHeight?: number;
    expandable?: TableExpandable;
    autoScrollTop?: boolean;
    rowSelection?: TableRowSelection<T>;
    pagination?: TablePagination | false;
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
