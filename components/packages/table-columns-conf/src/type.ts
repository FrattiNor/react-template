import { TableColumn, TableFixed, TableColumnsConfItem } from '@pkg/table';
import { Dispatch, SetStateAction } from 'react';

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
    setColumnsConf: Dispatch<SetStateAction<Record<string, TableColumnsConfItem>>>;
};

export type TableColumnConfRef = {
    submit: () => void;
    reset: () => void;
};
