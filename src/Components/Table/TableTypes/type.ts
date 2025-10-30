import type { ReactNode } from 'react';

import type { TableProps } from './typeProps';

// Table组件类型
export type TableComponent = <T extends Record<string, unknown>>(props: TableProps<T>) => ReactNode;

// Table 列render配置
export type TableColumnRender<T> = (item: T, otherData: { index: number }) => ReactNode;

// Table 列宽度
export type TableColumnWidth = number | `${number}%`;
