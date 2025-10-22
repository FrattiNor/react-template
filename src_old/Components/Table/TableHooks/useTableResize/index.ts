import { startTransition, useCallback, useEffect, useRef } from 'react';

import { FixedTwo } from '../../TableUtils';

import type { ResizeFlag, TableDataItem } from '../../TableTypes/type';
import type useTableColumn from '../useTableColumn';
import type useTableProps from '../useTableProps';
import type useTableState from '../useTableState';

// 避免触发一些事件导致mouse无法触发
function pauseEvent(e: Event) {
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault) e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
}

type Props<T extends TableDataItem> = {
	tableColumn: ReturnType<typeof useTableColumn<T>>;
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableState: ReturnType<typeof useTableState>;
};

// 表头resize
const useTableResize = <T extends TableDataItem>({ tableColumn, tableProps, tableState }: Props<T>) => {
	const { onResizeEnd } = tableProps;
	const { columnsFlat } = tableColumn;
	const { setResized, resizeFlag, setResizeFlag, setColumnSizes, maxColWidth, minColWidth, getColumnSize } = tableState;

	// resize结束回调
	const resizeEndCallback = () => {
		if (typeof onResizeEnd === 'function') {
			const sizeObj: Record<string, number> = {};
			columnsFlat.forEach(({ key }) => (sizeObj[key] = getColumnSize(key)));
			onResizeEnd(sizeObj);
		}
	};
	// 提供ref版func，避免闭包问题
	const resizeEndCallbackRef = useRef(resizeEndCallback);
	resizeEndCallbackRef.current = resizeEndCallback;

	useEffect(() => {
		if (resizeFlag) {
			const mouseMove = (e: MouseEvent) => {
				pauseEvent(e);
				// 修改后的size对象
				const nextSizeObj: Record<string, number> = {};
				// 移动列的数量
				const count = resizeFlag.children.length;
				// 整体移动距离【一定是整数】
				const moveX = e.pageX - resizeFlag.pageX;
				// 剩余移动距离
				let remainingMoveX = moveX % count;
				// 每列移动距离
				const eachMoveX = (moveX - remainingMoveX) / count;
				// 遍历需要移动的列
				resizeFlag.children.forEach(({ clientWidth, key }, index) => {
					// 当前列移动距离
					let currentMoveX = eachMoveX;
					// 从剩余移动距离中获取的移动距离
					const _addMoveX = remainingMoveX / (count - index);
					const addMoveX = _addMoveX >= 0 ? Math.ceil(_addMoveX) : Math.floor(_addMoveX);
					currentMoveX = currentMoveX + addMoveX;
					remainingMoveX = remainingMoveX - addMoveX;
					// 移动后的宽度
					const afterMoveWidth = clientWidth + currentMoveX;
					// 判定宽度小于最小宽度
					if (afterMoveWidth < minColWidth) {
						nextSizeObj[key] = minColWidth;
						remainingMoveX = remainingMoveX + Math.round(afterMoveWidth - minColWidth);
						return currentMoveX - Math.round(afterMoveWidth - minColWidth);
					}
					// 判断宽度大于最大宽度
					else if (afterMoveWidth > maxColWidth) {
						nextSizeObj[key] = maxColWidth;
						remainingMoveX = remainingMoveX + Math.round(afterMoveWidth - maxColWidth);
						return currentMoveX - Math.round(afterMoveWidth - maxColWidth);
					}
					// 判断宽度在合理范围
					else {
						nextSizeObj[key] = FixedTwo(afterMoveWidth);
						return currentMoveX;
					}
				});
				// 更新宽度
				startTransition(() => {
					setResized(true);
					setColumnSizes((old) => ({
						...old,
						...nextSizeObj,
					}));
				});
			};

			const mouseUp = (e: MouseEvent) => {
				pauseEvent(e);
				setResizeFlag(null);
				resizeEndCallbackRef.current();
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

			const nextChildren: ResizeFlag['children'] = [];
			const start = colIndexs[0];
			const end = colIndexs[colIndexs.length - 1];

			for (let i = start; i <= end; i++) {
				const key = columnsFlat[i].key;
				const clientWidth = getColumnSize(key);
				nextChildren.push({ key, clientWidth, index: i });
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
