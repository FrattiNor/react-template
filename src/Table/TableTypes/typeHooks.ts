import type useTableInstance from '../TableHooks/useTableInstance';
import type { TableDataItem } from './type';

export type TableInstance<T extends TableDataItem> = ReturnType<typeof useTableInstance<T>>;

export type ResizeFlag = {
	activeKey: string;
	pageX: number;
	children: {
		key: string;
		index: number;
		clientWidth: number;
	}[];
};
