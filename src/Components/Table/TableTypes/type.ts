import type { ReactNode } from 'react';

import type { TableProps } from './typeProps';

// Table组件类型
export type TableComponent = <T extends Record<string, unknown>>(props: TableProps<T>) => ReactNode;

// Table 列render配置
export type TableColumnRender<T> = (item: T, otherData: { index: number }) => ReactNode;

// Table 列宽度
export type TableColumnWidth = number | `${number}%`;

// Table 配置cell的span属性
export type TableColumnOnCellSpan<T> = (
	item: T,
	index: number,
) => {
	// 行占据几格，用于合并单元格
	rowSpan?: number;
	// 列占据几格，用于合并单元格
	colSpan?: number;
};

export type TableScrollbarState = { have: boolean; innerSize: number; width: number };

// Table Resize标记
export type ResizeFlag = {
	pageX: number;
	activeKey: string;
	children: Map<
		string,
		{
			key: string;
			index: number;
			clientWidth: number;
		}
	>;
};

export type TableColumnFixed = 'left' | 'right';

export type TableColumnAlign = 'left' | 'right' | 'center';
