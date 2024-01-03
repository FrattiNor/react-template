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

export type TableColumn<T> = {
    key: string;
    edit?: boolean;
    width?: number;
    title: ReactNode;
    resize?: boolean;
    flexGrow?: number;
    fixed?: TableFixed;
    align?: TableAlign;
    render?: (item: T, index: number) => ReactNode;
    saveEdit?: (value: string, item: T, index: number) => ReactNode;
};

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

export type TableProps<T> = {
    theme?: TableTheme;
    dataSource?: T[];
    loading?: boolean;
    rowHeight?: number;
    columns: TableColumn<T>[];
    calcRowHeight?: number;
    autoScrollTop?: boolean;
    rowKey: keyof T | ((v: T) => string);
    expandable?: TableExpandable | boolean; // 处理boolean
    pagination?: TablePagination | boolean; // 处理boolean
    rowSelection?: TableRowSelection<T> | boolean; // 处理boolean
};

export type HandledColumn<T> = Omit<TableColumn<T>, 'width' | 'flexGrow'> & {
    width: number;
    index: number;
    measureStyle: CSSProperties;
};

export type TableRef = {
    headElement: RefObject<HTMLDivElement | null>;
    bodyElement: RefObject<HTMLDivElement | null>;
    scrollTo: (conf: ScrollToOptions) => void;
};
