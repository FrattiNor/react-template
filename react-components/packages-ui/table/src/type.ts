import { CSSProperties, Dispatch, ReactNode, RefObject, SetStateAction } from 'react';

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

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

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
    render?: (item: T, index: number) => ReactNode;
    renderDomTitle?: (item: T, index: number) => string;
    edit?: boolean | ((item: T, index: number) => boolean);
    saveEdit?: (value: string, item: T, index: number) => void;
    cellProps?: DivProps | ((item: T, index: number) => DivProps);
};

export type TableColumns<T> = TableColumn<T>[];

export type TableRowSelection<T> = {
    width?: number;
    fixed?: TableFixed;
    selectedRowKeys?: string[];
    onChange?: Dispatch<SetStateAction<string[]>>;
    getCheckboxProps?: (item: T) => { disabled: boolean };
};

export type TableExpandable = {
    width?: number;
    fixed?: TableFixed;
    childrenColumnName?: string;
    expandedRowKeys?: string[];
    onChange?: (v: string[]) => void;
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
    className?: string;
    style?: CSSProperties;
    calcRowHeight?: number;
    autoScrollTop?: boolean;
    columns: TableColumns<T>;
    showIndex?: TableIndex | boolean;
    rowKey: keyof T | ((v: T) => string);
    expandable?: TableExpandable | boolean;
    pagination?: TablePagination | boolean;
    virtual?: boolean | 'vertical' | 'horizontal';
    rowSelection?: TableRowSelection<T> | boolean;
    onResizeEnd?: (widths: Record<string, number>) => void;
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
