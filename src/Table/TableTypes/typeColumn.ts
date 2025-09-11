import type { ReactNode } from 'react';
import type { TableDataItem } from './type';

// onCell 的 colSpan 和 fixed 存在冲突
export type TableColumn<T extends TableDataItem> = {
	key: string;
	title: ReactNode;
	render: (item: T, index: number) => ReactNode;
	width: number | `${number}%`;
	flexGrow?: number;
	fixed?: 'left' | 'right';
	// forceRender?: boolean;
	onCell?: (item: T, index: number) => { rowSpan?: number; colSpan?: number };
};

export type TableColumns<T extends TableDataItem> = Array<TableColumn<T>>;
