import type { ReactNode } from 'react';

// Table 数据源 的基础类型
export type TableDataItem = Record<string, unknown>;

// 取对象对应value的key
export type ValueTypeKeys<T, Type> = { [K in keyof T]: T[K] extends Type ? K : never }[keyof T];

// Table 列render配置
export type TableColumnRender<T extends TableDataItem> = (item: T, otherData: { index: number }) => ReactNode;
