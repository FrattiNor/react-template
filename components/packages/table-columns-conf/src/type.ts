import { TableColumn, TableColumns, TableFixed } from '@pkg/table';

export type TableConfColumn = Omit<TableColumn<any>, 'fixed'> & { id: string; index: number; hidden: boolean; fixed: TableFixed };

export type TableColumnConfData = Record<string, TableConfColumn[]>;

export type TableColumnConfProps = {
    columns: TableColumns<any>;
};

export type TableColumnConfRef = {
    submit: () => void;
    reset: () => void;
};
