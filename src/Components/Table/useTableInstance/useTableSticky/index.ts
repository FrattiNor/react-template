import { useCallback, type CSSProperties } from 'react';

import type useTableColumns from '../useTableColumns';
import type useTableState from '../useTableState';

type Props<T> = {
	tableState: ReturnType<typeof useTableState>;
	tableColumns: ReturnType<typeof useTableColumns<T>>;
};

// 表格左右固定
const useTableSticky = <T>({ tableColumns, tableState }: Props<T>) => {
	const { v_ScrollbarWidth } = tableState;
	const { fixedLeftObj, fixedRightObj } = tableColumns;

	const getStickyStyle = useCallback(
		({ colIndexStart, colIndexEnd, type }: { colIndexStart: number; colIndexEnd: number; type: 'head' | 'body' }) => {
			if (fixedLeftObj[colIndexStart]) {
				const { stickySize } = fixedLeftObj[colIndexStart];
				const style: CSSProperties = { position: 'sticky', zIndex: 5, left: stickySize };
				// const pinged = colIndexStart >= (pingedLeftEnd ?? Infinity);
				// if (pinged) style.zIndex = 10;
				return style;
			}

			if (fixedRightObj[colIndexEnd]) {
				const { stickySize } = fixedRightObj[colIndexEnd];
				const right = type === 'head' ? stickySize + v_ScrollbarWidth : stickySize;
				const style: CSSProperties = { position: 'sticky', zIndex: 5, right };
				// const pinged = colIndexEnd >= (pingedRightEnd ?? Infinity);
				// if (pinged) style.zIndex = 10;
				return style;
			}

			return undefined;
		},
		[fixedLeftObj, fixedRightObj, v_ScrollbarWidth],
	);

	return { getStickyStyle };
};

export default useTableSticky;
