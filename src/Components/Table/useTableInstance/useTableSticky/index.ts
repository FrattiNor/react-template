import { useCallback, useMemo, type CSSProperties } from 'react';

import type useTableColumns from '../useTableColumns';
import type useTableState from '../useTableState';

type Props<T> = {
	tableState: ReturnType<typeof useTableState>;
	tableColumns: ReturnType<typeof useTableColumns<T>>;
};

// 表格左右固定
const useTableSticky = <T>({ tableColumns, tableState }: Props<T>) => {
	const { v_scrollbar, pingedMap } = tableState;
	const { fixedLeftMap, fixedRightMap, columnsKeyIndexMap } = tableColumns;

	// 根据pingedMap计算相关数据
	const { pingedLeftStart, pingedLeftEnd, pingedRightStart } = useMemo(() => {
		let pingedLeftStart: number | undefined = undefined;
		let pingedLeftEnd: number | undefined = undefined;
		let pingedRightStart: number | undefined = undefined;
		let pingedRightEnd: number | undefined = undefined;
		pingedMap.forEach(({ index, fixed }) => {
			if (fixed === 'left') {
				if (pingedLeftStart === undefined || index < pingedLeftStart) pingedLeftStart = index;
				if (pingedLeftEnd === undefined || index > pingedLeftEnd) pingedLeftEnd = index;
			}
			if (fixed === 'right') {
				if (pingedRightStart === undefined || index < pingedRightStart) pingedRightStart = index;
				if (pingedRightEnd === undefined || index > pingedRightEnd) pingedRightEnd = index;
			}
		});
		return { pingedLeftStart, pingedLeftEnd, pingedRightStart, pingedRightEnd };
	}, [pingedMap]);

	const getBodyStickyStyle = useCallback(
		({ colKeys }: { colKeys: string[] }) => {
			let leftLastPinged = false;
			let leftFirstPinged = false;
			let rightLastPinged = false;
			let stickyStyle: CSSProperties = {};

			const startKey = colKeys[0];
			const endKey = colKeys[colKeys.length - 1];
			const colIndexStart = columnsKeyIndexMap.get(startKey) ?? Infinity;
			const colIndexEnd = columnsKeyIndexMap.get(endKey) ?? Infinity;

			const fixedLeftValue = fixedLeftMap.get(startKey);
			if (fixedLeftValue) {
				const stickySize = fixedLeftValue.stickySize;
				stickyStyle = { left: stickySize, position: 'sticky', zIndex: 6 };
				leftFirstPinged = colIndexStart === pingedLeftStart;
				leftLastPinged = colIndexEnd === pingedLeftEnd;
				const pinged = colIndexStart <= (pingedLeftEnd ?? -1);
				if (pinged) stickyStyle.zIndex = 10;
			}

			const fixedRightValue = fixedRightMap.get(endKey);
			if (fixedRightValue) {
				const stickySize = fixedRightValue.stickySize;
				stickyStyle = { position: 'sticky', zIndex: 5, right: stickySize };
				rightLastPinged = colIndexStart === pingedRightStart;
				const pinged = colIndexEnd >= (pingedRightStart ?? Infinity);
				if (pinged) stickyStyle.zIndex = 11;
			}

			return { stickyStyle, leftLastPinged, leftFirstPinged, rightLastPinged };
		},
		[fixedLeftMap, fixedRightMap, columnsKeyIndexMap, pingedMap, pingedLeftEnd, pingedLeftStart, pingedRightStart],
	);

	const getHeadStickyStyle = useCallback(
		({ colKeys }: { colKeys: string[] }) => {
			let leftLastPinged = false;
			let leftFirstPinged = false;
			let rightLastPinged = false;
			let stickyStyle: CSSProperties = {};

			const startKey = colKeys[0];
			const endKey = colKeys[colKeys.length - 1];
			const colIndexStart = columnsKeyIndexMap.get(startKey) ?? Infinity;
			const colIndexEnd = columnsKeyIndexMap.get(endKey) ?? Infinity;

			const fixedLeftValue = fixedLeftMap.get(startKey);
			if (fixedLeftValue) {
				const stickySize = fixedLeftValue.stickySize;
				stickyStyle = { left: stickySize, position: 'sticky', zIndex: 6 };
				leftFirstPinged = colIndexStart === pingedLeftStart;
				leftLastPinged = colIndexEnd === pingedLeftEnd;
				const pinged = colIndexStart <= (pingedLeftEnd ?? -1);
				if (pinged) stickyStyle.zIndex = 10;
			}

			const fixedRightValue = fixedRightMap.get(endKey);
			if (fixedRightValue) {
				const stickySize = fixedRightValue.stickySize;
				stickyStyle = { position: 'sticky', zIndex: 5, right: v_scrollbar.have ? stickySize + v_scrollbar.width : stickySize };
				rightLastPinged = colIndexStart === pingedRightStart;
				const pinged = colIndexEnd >= (pingedRightStart ?? Infinity);
				if (pinged) stickyStyle.zIndex = 11;
			}

			return { stickyStyle, leftLastPinged, leftFirstPinged, rightLastPinged };
		},
		[v_scrollbar, fixedLeftMap, fixedRightMap, columnsKeyIndexMap, pingedMap, pingedLeftEnd, pingedLeftStart, pingedRightStart],
	);

	return { getBodyStickyStyle, getHeadStickyStyle };
};

export default useTableSticky;
