import type { ReactNode } from 'react';

// Table 数据源 的基础类型
export type TableDataItem = Record<string, unknown>;

// Table 列render配置
export type TableColumnRender<T extends TableDataItem> = (item: T, otherData: { index: number }) => ReactNode;

// Table 列宽度
export type TableColumnWidth = number | `${number}%`;
