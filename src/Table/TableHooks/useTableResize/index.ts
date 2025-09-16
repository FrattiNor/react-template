import { startTransition, useCallback, useEffect } from 'react';
import type useTableState from '../useTableState';
import type { ResizeFlag2 } from '../type';
import type { TableDataItem } from '../../TableTypes/type';
import type useTableProps from '../useTableProps';

// 避免触发一些事件导致mouse无法触发
function pauseEvent(e: Event) {
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault) e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
}

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableState: ReturnType<typeof useTableState>;
};

// 表头resize
const useTableResize = <T extends TableDataItem>({ tableProps, tableState }: Props<T>) => {
	const { columnsFlat } = tableProps;
	const { setResized, resizeFlag, setResizeFlag, setColumnSizes, maxColWidth, minColWidth, getColumnSize } = tableState;

	useEffect(() => {
		if (resizeFlag) {
			const mouseMove = (e: MouseEvent) => {
				pauseEvent(e);
				const nextSize: Record<string, number> = {};

				const loop = (_totalSize: number, resizes: ResizeFlag2['children']) => {
					let totalSize = _totalSize;
					const count = resizes.length;
					const eachSize = totalSize / count;
					const nextResizes: ResizeFlag2['children'] = [];
					resizes.forEach((item) => {
						const { key, clientWidth } = item;
						const oldSize = nextSize[key] ?? clientWidth;
						const nextWidth = oldSize + eachSize;
						if (nextWidth <= minColWidth) {
							nextSize[key] = minColWidth;
							totalSize -= minColWidth - oldSize;
						} else if (nextWidth >= maxColWidth) {
							nextSize[key] = maxColWidth;
							totalSize -= maxColWidth - oldSize;
						} else {
							nextSize[key] = nextWidth;
							totalSize -= nextWidth - oldSize;
							nextResizes.push(item);
						}
					});
					if (totalSize !== 0 && nextResizes.length > 0) {
						loop(totalSize, nextResizes);
					}
				};

				loop(e.pageX - resizeFlag.pageX, resizeFlag.children);

				startTransition(() => {
					setResized(true);
					setColumnSizes((old) => ({
						...old,
						...nextSize,
					}));
				});
			};

			const mouseUp = (e: MouseEvent) => {
				pauseEvent(e);
				setResizeFlag(null);
			};

			document.addEventListener('mouseup', mouseUp);
			document.addEventListener('mousemove', mouseMove);

			return () => {
				document.removeEventListener('mouseup', mouseUp);
				document.removeEventListener('mousemove', mouseMove);
			};
		}
	}, [resizeFlag]);

	const startResize = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>, colKey: string, colIndexs: [number] | [number, number]) => {
			pauseEvent(e as unknown as Event);

			const nextChildren: ResizeFlag2['children'] = [];
			const start = colIndexs[0];
			const end = colIndexs[colIndexs.length - 1];

			for (let i = start; i <= end; i++) {
				const key = columnsFlat[i].key;
				const clientWidth = getColumnSize(key);
				nextChildren.push({ key, clientWidth });
			}

			setResizeFlag({
				activeKey: colKey,
				pageX: e.pageX,
				children: nextChildren,
			});
		},
		[columnsFlat, getColumnSize],
	);

	return { startResize };
};

export default useTableResize;
