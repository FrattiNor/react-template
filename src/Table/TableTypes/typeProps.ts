import type {
	TableDataItem,
	TableRowSelection,
	TableHighlightConfig,
	TableRowBgHighlight,
	TableDraggable,
	TableVirtualConfig,
	ValueTypeKeys,
} from './type';
import type { TableColumns } from './typeColumn';

export type TableProps<T extends TableDataItem> = {
	// 主题 dark需优化
	theme?: 'light' | 'dark';
	// 数据源
	data?: Array<T>;
	// 列配置
	columns: TableColumns<T>;
	// 行key
	rowKey: ValueTypeKeys<T, string> | ((item: T, index: number) => string);
	// 边框样式
	bordered?: boolean;
	// 行高
	rowHeight?: number;
	// 拖动修改大小的回调，用于保存列宽配置
	onResizeEnd?: (widths: Record<string, number>) => void;
	// 表格loading状态
	loading?: boolean;
	// 表格可选中
	rowSelection?: TableRowSelection<T>;
	// 全局高亮关键字
	highlightKeywords?: string[];
	// 文本高亮配置
	highlightConfig?: TableHighlightConfig;
	// 行背景高亮
	rowBgHighlight?: TableRowBgHighlight;
	// 可拖拽排序【和onCell的rowSpan冲突】【和expandable冲突】
	draggable?: TableDraggable;
	// TODO 表格可展开【和onCell的rowSpan冲突】
	expandable?: undefined;
	// 虚拟列表开关、可开启关闭虚拟功能
	virtual?: TableVirtualConfig<T>;
	// TODO 列配置
	columnConf?: undefined;
};
