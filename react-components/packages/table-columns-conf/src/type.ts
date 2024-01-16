import { TableColumn, TableFixed, TableColumnsConfItem } from '@pkg/table';

export type TableConfColumn = Omit<TableColumn<any>, 'fixed'> & {
    id: string;
    index: number;
    hidden: boolean;
    fixed: TableFixed;
};

export type TableConfColumnData = Record<string, TableConfColumn[]>;

export type TableColumnConfProps = {
    columns: TableConfColumn[];
    defaultColumns: TableConfColumn[];
    setColumnsConf: (v: Record<string, TableColumnsConfItem>) => void;
};

export type TableColumnConfRef = {
    submit: () => void;
    reset: () => void;
};
