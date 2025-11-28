import type { TableColumnWidth } from './type';
import type { TableColumns } from './typeColumn';
import type { ValueTypeKeys } from './typeUtil';

type TableRowKey<T> = ValueTypeKeys<T, string> | ((item: T, index: number) => string);

export type TableProps<T> = {
	// 数据源
	data: Array<T> | undefined;
	// 列配置
	columns: TableColumns<T>;
	// 行key
	rowKey: TableRowKey<T>;
	// 边框样式
	bordered?: boolean;
	// 最小行高
	rowHeight?: number;
	// 加载中
	loading?: boolean;
	// 拖动修改大小的回调，用于保存列宽配置
	onResizeEnd?: (widths: Record<string, number>) => void;
	// 列配置【覆盖】
	columnConf?: {
		sortConf?: Record<string, number>; // 排序
		visibleConf?: Record<string, boolean>; // 可见
		widthConf?: Record<string, TableColumnWidth>; // 宽度
	};
	// 行高亮配置
	rowBgHighlight?: {
		rowHover?: boolean;
		rowClick?: boolean;
		rowSelect?: boolean;
	};
};
