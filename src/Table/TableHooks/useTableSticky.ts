import type { CSSProperties } from 'react';
import type useTableDomRef from './useTableDomRef';
import type useTableSecondaryState from './useTableSecondaryState';
import type useTableState from './useTableState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableSecondaryState: ReturnType<typeof useTableSecondaryState>;
};

// 表格左右固定
const useTableSticky = ({ tableSecondaryState }: Props) => {
	const getStickyStyle = ({ colKey }: { colKey: string }) => {
		const style: CSSProperties = {};
		if (typeof tableSecondaryState.fixedLeftObj[colKey] === 'number') {
			style.position = 'sticky';
			style.left = tableSecondaryState.fixedLeftObj[colKey];
			style.zIndex = 9;
			return style;
		}
		if (typeof tableSecondaryState.fixedRightObj[colKey] === 'number') {
			style.position = 'sticky';
			style.right = tableSecondaryState.fixedRightObj[colKey];
			style.zIndex = 10;
			return style;
		}
		return undefined;
	};

	return { getStickyStyle };
};

export default useTableSticky;
