import { useCallback, type CSSProperties } from 'react';

import type useTableColumns from '../useTableColumns';
import type useTableState from '../useTableState';

type Props<T> = {
	tableState: ReturnType<typeof useTableState>;
	tableColumns: ReturnType<typeof useTableColumns<T>>;
};

// 表格左右固定
const useTableSticky = <T>({ tableColumns, tableState }: Props<T>) => {
	const { fixedLeftObj, fixedRightObj } = tableColumns;
	const { v_scrollbar, pingedLeftEnd, pingedLeftStart, pingedRightStart } = tableState;

	const getStickyStyle = useCallback(
		({ colIndexStart, colIndexEnd, type }: { colIndexStart: number; colIndexEnd: number; type: 'head' | 'body' }) => {
			let leftLastPinged = false;
			let leftFirstPinged = false;
			let rightLastPinged = false;
			let stickyStyle: CSSProperties = {};

			if (fixedLeftObj[colIndexStart]) {
				const stickySize = fixedLeftObj[colIndexStart].stickySize;
				stickyStyle = { left: stickySize, position: 'sticky', zIndex: 6 };
				leftFirstPinged = colIndexStart === pingedLeftStart;
				leftLastPinged = colIndexEnd === pingedLeftEnd;
				const pinged = colIndexStart <= (pingedLeftEnd ?? -1);
				if (pinged) stickyStyle.zIndex = 10;
			}

			if (fixedRightObj[colIndexEnd]) {
				const stickySize = fixedRightObj[colIndexEnd].stickySize;
				const right = type === 'head' && v_scrollbar.have ? stickySize + v_scrollbar.width : stickySize;
				stickyStyle = { position: 'sticky', zIndex: 5, right };
				rightLastPinged = colIndexStart === pingedRightStart;
				const pinged = colIndexEnd >= (pingedRightStart ?? Infinity);
				if (pinged) stickyStyle.zIndex = 11;
			}

			return { stickyStyle, leftLastPinged, leftFirstPinged, rightLastPinged };
		},
		[fixedLeftObj, fixedRightObj, v_scrollbar, pingedLeftEnd, pingedLeftStart, pingedRightStart],
	);

	return { getStickyStyle };
};

export default useTableSticky;
