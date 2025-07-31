import type { ReactNode } from 'react';
import type { TableDataItem } from './type';

export type TableColumn<T extends TableDataItem> = {
	key: string;
	title: ReactNode;
	render: (item: T) => ReactNode;
	width: number | `${number}%`;
};

export type TableColumns<T extends TableDataItem> = Array<TableColumn<T>>;
