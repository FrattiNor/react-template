import type { TableDataItem } from '../TableTypes/type';
import type useTableInstance from './useTableInstance';

export type TableInstance<T extends TableDataItem> = ReturnType<typeof useTableInstance<T>>;

export type ResizeFlag2 = {
	activeKey: string;
	pageX: number;
	children: {
		key: string;
		clientWidth: number;
	}[];
};
