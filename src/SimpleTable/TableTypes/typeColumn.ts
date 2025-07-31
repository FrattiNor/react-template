import type { ReactNode } from 'react';
import type { TableDataItem } from './type';

export type TableColumn<T extends TableDataItem> = {
	type?: 'column';
	title: ReactNode;
	key: string;
	render: (item: T) => ReactNode;
};

export type TableColumnGroup<T extends TableDataItem> = {
	type: 'group';
	key: string;
	title: ReactNode;
	children: Array<TableColumnGroup<T> | TableColumn<T>>;
};

export type TableColumns<T extends TableDataItem> = Array<TableColumn<T> | TableColumnGroup<T>>;
