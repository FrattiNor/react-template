import { TableColumn, TableFixed, TableColumnsConfItem } from '@pkg/table';

export type TableConfColumn = Omit<TableColumn<any>, 'fixed' | 'width'> & {
    id: string;
    index: number;
    hidden: boolean;
    fixed: TableFixed;
    width: number;
};

export type TableConfColumnData = Record<string, TableConfColumn[]>;

export type TableColumnConfProps = {
    columns: TableConfColumn[];
    setColumnsConf: (v: Record<string, TableColumnsConfItem>) => void;
};

export type TableColumnConfRef = {
    submit: () => void;
    reset: () => void;
};
