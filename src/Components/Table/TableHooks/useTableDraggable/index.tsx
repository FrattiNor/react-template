import { useMemo, useState } from 'react';

import DragIcon from './DragIcon';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableColumn } from '../../TableTypes/typeColumn';
import type useTableProps from '../useTableProps';
import type { useTableTools_1 } from '../useTableTools';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableTools_1: ReturnType<typeof useTableTools_1<T>>;
};

const useTableDraggable = <T extends TableDataItem>({ tableProps, tableTools_1 }: Props<T>) => {
	const { draggable } = tableProps;
	const haveDraggable = !!draggable;
	const { getRowKey } = tableTools_1;
	const onDragEnd = draggable?.onDragEnd;
	const [dragActiveItem, setDragActiveItem] = useState<{ rowIndex: number } | null>(null);

	const draggableColumn = useMemo(() => {
		if (haveDraggable) {
			// 列配置
			const column: TableColumn<T> = {
				width: 50,
				flexGrow: 0,
				fixed: 'left',
				resize: false,
				align: 'center',
				key: 'rowDraggable',
				title: '',
				render: (item, { index }) => {
					const key = getRowKey(item, index);
					return <DragIcon id={key} />;
				},
			};
			return column;
		}
		return undefined;
	}, [haveDraggable, getRowKey]);

	return { haveDraggable, draggableColumn, dragActiveItem, setDragActiveItem, onDragEnd };
};

export default useTableDraggable;
