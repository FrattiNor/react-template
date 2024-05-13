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

// Table 筛选参数
export type TableColumnFilter = {
    filtered: boolean;
    dropdown: (opt: { setVisible: (v: boolean) => void }) => ReactNode;
};

// Table Column 和对外的Same部分
export type TableColumnSame<T> = {
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
    filter?: TableColumnFilter;
    summary?: (() => ReactNode) | (() => ReactNode)[];
};

// Table Column
export type TableColumn<T> = TableColumnSame<T> & {
    key: string;
    render?: (item: T, index: number, pagination?: ColumnPagination) => ReactNode;
};

// Table Columns
export type TableColumns<T> = TableColumn<T>[];

// 处理后的 Column
export type HandledColumn<T> = Omit<TableColumn<T>, 'width' | 'flexGrow'> & {
    width: number;
    index: number;
    measureStyle: CSSProperties;
};

// Table 行选择参数
export type TableRowSelection<T> = {
    width?: number;
    selectedRowKeys?: string[];
    onSelectedRowKeysChange?: Dispatch<SetStateAction<string[]>>;
    getCheckboxProps?: (item: T) => { disabled: boolean };
};

// Table 展开参数
export type TableExpandable = {
    width?: number;
    expandedRowKeys?: string[];
    childrenColumnName?: string;
    onExpandedRowKeysChange?: Dispatch<SetStateAction<string[]>>;
};

// Table Ref
export type TableRef = {
    scrollTo: (options: { left?: number; top?: number; behavior?: 'auto' | 'instant' | 'smooth' }) => void;
};

// 对外的TableColumn
export type TableColumnOut<T> =
    | (TableColumnSame<T> & {
          key: string;
          render: (item: T, index: number, pagination?: ColumnPagination) => ReactNode;
      })
    | (TableColumnSame<T> & {
          key: keyof T; // key限制为T的字段，避免没写render时无法校验字段是否存在
      });

//  对外的TableColumns
export type TableColumnsOut<T> = TableColumnOut<T>[];

// Table Props
export type TableProps<T> = {
    dataSource?: T[];
    loading?: boolean;
    rowHeight?: number;
    columns: TableColumnsOut<T>;
    expandable?: TableExpandable | true;
    pagination?: TablePagination | true;
    rowSelection?: TableRowSelection<T> | true;
    rowKey: keyof T | ((v: T) => string);
    onResizeEnd?: (widths: Record<string, number>) => void;

    className?: string;
    style?: CSSProperties;
};
