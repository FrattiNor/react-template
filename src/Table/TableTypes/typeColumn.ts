import type { ReactNode } from 'react';
import type { TableDataItem } from './type';

export type TableColumn<T extends TableDataItem> = {
	key: string;
	title: ReactNode;
	render: (item: T) => ReactNode;
};

export type TableColumns<T extends TableDataItem> = Array<TableColumn<T>>;
