import { useCallback, type CSSProperties } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';

import type useTableColumns from '../useTableColumns';
import type useTableState from '../useTableState';

type Props<T> = {
	tableState: ReturnType<typeof useTableState>;
	tableColumns: ReturnType<typeof useTableColumns<T>>;
};

// 表格左右固定
const useTableSticky = <T>({ tableColumns, tableState }: Props<T>) => {
	const { v_ScrollbarWidth, pingedRightEnd, pingedLeftEnd } = tableState;
	const { fixedLeftObj, fixedRightObj } = tableColumns;

	const getStickyStyle = useCallback(
		({ colIndexStart, colIndexEnd, type }: { colIndexStart: number; colIndexEnd: number; type: 'head' | 'body' }) => {
			if (fixedLeftObj[colIndexStart]) {
				const { stickySize } = fixedLeftObj[colIndexStart];
				const stickyStyle: CSSProperties = {
					transform: 'translate3d(0,0,0)',
					backgroundColor: '#fff1f0',
					left: stickySize,
					position: 'sticky',
					zIndex: 6,
				};
				let stickyClassName = styles['fixed-left'];
				const pinged = colIndexStart <= (pingedLeftEnd ?? -1);
				if (pinged) stickyClassName = classNames(styles['pinged']);
				return { stickyStyle, stickyClassName };
			}

			if (fixedRightObj[colIndexEnd]) {
				const { stickySize } = fixedRightObj[colIndexEnd];
				const right = type === 'head' ? stickySize + v_ScrollbarWidth : stickySize;
				const stickyStyle: CSSProperties = {
					transform: 'translate3d(0,0,0)',
					backgroundColor: '#e6f4ff',
					position: 'sticky',
					zIndex: 5,
					right,
				};
				let stickyClassName = styles['fixed-right'];
				const pinged = colIndexEnd >= (pingedRightEnd ?? Infinity);
				if (pinged) stickyClassName = classNames(styles['pinged']);
				return { stickyStyle, stickyClassName };
			}

			return { stickyStyle: undefined, stickyClassName: '' };
		},
		[fixedLeftObj, fixedRightObj, pingedLeftEnd, pingedRightEnd, v_ScrollbarWidth],
	);

	return { getStickyStyle };
};

export default useTableSticky;
