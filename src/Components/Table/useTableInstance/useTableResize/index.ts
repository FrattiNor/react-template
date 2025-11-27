import { useCallback, useEffect } from 'react';

import { type ResizeFlag } from '../../TableTypes/type';
import { FixedTwo, getLeafColumn } from '../../TableUtils';
import { maxColWidth, minColWidth } from '../../TableUtils/configValues';

import type useTableColumns from '../useTableColumns';
import type useTableRequiredProps from '../useTableRequiredProps';
import type useTableState from '../useTableState';

// 避免触发一些事件导致mouse无法触发
function pauseEvent(e: Event) {
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault) e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
}

type Props<T> = {
	tableState: ReturnType<typeof useTableState>;
	tableColumns: ReturnType<typeof useTableColumns<T>>;
	tableRequiredProps: ReturnType<typeof useTableRequiredProps<T>>;
};

// 表格resize宽度
const useTableResize = <T>({ tableState, tableColumns }: Props<T>) => {
	const { splitColumnsArr } = tableColumns;
	const { resizeFlag, setResized, setResizeFlag, setSizeCacheMap, sizeCacheMap } = tableState;

	useEffect(() => {
		if (resizeFlag) {
			const mouseMove = (e: MouseEvent) => {
				pauseEvent(e);
				// 更新宽度
				setResized(true);
				setSizeCacheMap((old) => {
					const next = new Map(old);
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
							next.set(key, minColWidth);
							remainingMoveX = remainingMoveX + Math.round(afterMoveWidth - minColWidth);
							return currentMoveX - Math.round(afterMoveWidth - minColWidth);
						}
						// 判断宽度大于最大宽度
						else if (afterMoveWidth > maxColWidth) {
							next.set(key, maxColWidth);
							remainingMoveX = remainingMoveX + Math.round(afterMoveWidth - maxColWidth);
							return currentMoveX - Math.round(afterMoveWidth - maxColWidth);
						}
						// 判断宽度在合理范围
						else {
							next.set(key, FixedTwo(afterMoveWidth));
							return currentMoveX;
						}
					});

					return next;
				});
			};

			const mouseUp = (e: MouseEvent) => {
				pauseEvent(e);
				setResizeFlag(null);
				// resizeEndCallbackRef.current();
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
		({
			e,
			columnKey,
			colIndexStart,
			colIndexEnd,
		}: {
			columnKey: string;
			colIndexStart: number;
			colIndexEnd: number;
			e: React.MouseEvent<HTMLDivElement, MouseEvent>;
		}) => {
			const nextChildren: ResizeFlag['children'] = [];

			for (let i = colIndexStart; i <= colIndexEnd; i++) {
				const key = getLeafColumn(splitColumnsArr[i]).key;
				const clientWidth = sizeCacheMap.get(key) ?? 0;
				nextChildren.push({ key, clientWidth, index: i });
			}

			setResizeFlag({
				activeKey: columnKey,
				pageX: e.pageX,
				children: nextChildren,
			});

			pauseEvent(e as unknown as Event);
		},
		[splitColumnsArr, sizeCacheMap],
	);

	return { startResize };
};

export default useTableResize;
