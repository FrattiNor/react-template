import type { ReactNode } from 'react';

import type { TableColumnRender, TableDataItem } from './type';

// onCell 的 colSpan 和 fixed 存在冲突
export type TableColumn<T extends TableDataItem> = {
	// 列key
	key: string;
	// 列标题
	title: ReactNode;
	// 列单元格渲染
	render: TableColumnRender<T>;
};

export type TableColumns<T extends TableDataItem> = Array<TableColumn<T>>;
