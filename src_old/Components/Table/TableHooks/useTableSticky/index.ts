import { useCallback, type CSSProperties } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';

import type useTableDomRef from '../useTableDomRef';
import type useTableSecondaryState from '../useTableSecondaryState';
import type useTableState from '../useTableState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableSecondaryState: ReturnType<typeof useTableSecondaryState>;
};

// 表格左右固定
const useTableSticky = ({ tableSecondaryState, tableState }: Props) => {
	const { fixedLeftObj, fixedRightObj } = tableSecondaryState;
	const { V_ScrollbarWidth, pingedLeftFirst, pingedLeftLast, pingedRightFirst, pingedRightLast } = tableState;

	const getStickyStyleAndClassName = useCallback(
		({ colIndexs, type }: { colIndexs: [number, number] | [number]; type: 'head' | 'body' }) => {
			const colStartIndex = colIndexs[0];
			const colEndIndex = colIndexs[colIndexs.length - 1];

			if (fixedLeftObj[colStartIndex]) {
				let className = styles['sticky-left'];
				const { stickySize } = fixedLeftObj[colStartIndex];
				const style: CSSProperties = { left: stickySize };
				if (colStartIndex <= (pingedLeftLast ?? -1)) className = classNames(className, styles['pinged']);
				if (colEndIndex === pingedLeftFirst) className = classNames(className, styles['first-pinged']);
				if (colEndIndex === pingedLeftLast) className = classNames(className, styles['last-pinged']);
				return { stickyStyle: style, stickyClassName: className, sticky: true };
			}

			if (fixedRightObj[colEndIndex]) {
				let className = styles['sticky-right'];
				const { stickySize } = fixedRightObj[colEndIndex];
				const right = type === 'head' ? stickySize + V_ScrollbarWidth : stickySize;
				const style: CSSProperties = { right };
				if (colEndIndex >= (pingedRightFirst ?? Infinity)) className = classNames(className, styles['pinged']);
				if (colStartIndex === pingedRightFirst) className = classNames(className, styles['first-pinged']);
				return { stickyStyle: style, stickyClassName: className, sticky: true };
			}

			return {
				sticky: false,
				stickyStyle: undefined,
				stickyClassName: '',
			};
		},
		[fixedLeftObj, fixedRightObj, V_ScrollbarWidth, pingedLeftFirst, pingedLeftLast, pingedRightFirst, pingedRightLast],
	);

	return { getStickyStyleAndClassName };
};

export default useTableSticky;
