import type { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react';

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

type ColumnPagination = {
    total: number;
    current: number;
    pageSize: number;
};

export type TableColumnFilter = {
    filtered: boolean;
    dropdown: (opt: { setVisible: (v: boolean) => void }) => ReactNode;
};

export type TableColumn<T> = {
    key: string;
    width?: number;
    title: ReactNode;
    resize?: boolean;
    flexGrow?: number;
    fixed?: TableFixed;
    align?: TableAlign;
    forceRender?: boolean;
    renderAs?: 'str' | 'block';
    renderCellTitle?: (item: T, index: number) => string;
    edit?: boolean | ((item: T, index: number) => boolean);
    saveEdit?: (value: string, item: T, index: number) => void;
    render?: (item: T, index: number, pagination?: ColumnPagination) => ReactNode;
    filter?: TableColumnFilter;
};

export type HandledColumn<T> = Omit<TableColumn<T>, 'width' | 'flexGrow'> & {
    width: number;
    index: number;
    measureStyle: CSSProperties;
};

export type TableColumns<T> = TableColumn<T>[];

export type TableRowSelection<T> = {
    width?: number;
    selectedRowKeys?: string[];
    onSelectedRowKeysChange?: Dispatch<SetStateAction<string[]>>;
    getCheckboxProps?: (item: T) => { disabled: boolean };
};

export type TableExpandable = {
    width?: number;
    expandedRowKeys?: string[];
    childrenColumnName?: string;
    onExpandedRowKeysChange?: Dispatch<SetStateAction<string[]>>;
};

export type TableProps<T> = {
    dataSource?: T[];
    loading?: boolean;
    rowHeight?: number;
    className?: string;
    style?: CSSProperties;
    calcRowHeight?: number;
    autoScrollTop?: boolean;
    columns: TableColumns<T>;
    expandable?: TableExpandable | true;
    pagination?: TablePagination | true;
    rowSelection?: TableRowSelection<T> | true;
    rowKey: keyof T | ((v: T) => string);
    onResizeEnd?: (widths: Record<string, number>) => void;
};
