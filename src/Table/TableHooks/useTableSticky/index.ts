import { useCallback, type CSSProperties } from 'react';
import type useTableDomRef from '../useTableDomRef';
import type useTableSecondaryState from '../useTableSecondaryState';
import type useTableState from '../useTableState';
import styles from './index.module.less';
import classNames from 'classnames';

type Props = {
	tableState: ReturnType<typeof useTableState>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableSecondaryState: ReturnType<typeof useTableSecondaryState>;
};

// 表格左右固定
const useTableSticky = ({ tableSecondaryState, tableState }: Props) => {
	const { fixedLeftObj, fixedRightObj } = tableSecondaryState;
	const { V_ScrollbarWidth, leftPingedIndex, rightPingedIndex } = tableState;

	const getStickyStyleAndClassName = useCallback(
		({ colIndexs, type }: { colIndexs: [number, number] | [number]; type: 'head' | 'body' }) => {
			const colStartIndex = colIndexs[0];
			const colEndIndex = colIndexs[colIndexs.length - 1];

			if (fixedLeftObj[colStartIndex]) {
				let className = styles['sticky-left'];
				const { stickySize } = fixedLeftObj[colStartIndex];
				const style: CSSProperties = { left: stickySize };
				const pinged = colStartIndex <= (leftPingedIndex ?? -1);
				const lastPinged = colEndIndex === leftPingedIndex;
				if (pinged) style.zIndex = 10;
				if (lastPinged) className = classNames(className, styles['last-pinged']);
				return { stickyStyle: style, stickyClassName: className, sticky: true };
			}

			if (fixedRightObj[colEndIndex]) {
				let className = styles['sticky-right'];
				const { stickySize } = fixedRightObj[colEndIndex];
				const right = type === 'head' ? stickySize + V_ScrollbarWidth : stickySize;
				const style: CSSProperties = { right };
				const pinged = colEndIndex >= (rightPingedIndex ?? Infinity);
				const lastPinged = colStartIndex === rightPingedIndex;
				if (pinged) style.zIndex = 10;
				if (lastPinged) className = classNames(className, styles['last-pinged']);
				return { stickyStyle: style, stickyClassName: className, sticky: true };
			}

			return {
				sticky: false,
				stickyStyle: undefined,
				stickyClassName: undefined,
			};
		},
		[fixedLeftObj, fixedRightObj, V_ScrollbarWidth, leftPingedIndex, rightPingedIndex],
	);

	return { getStickyStyleAndClassName };
};

export default useTableSticky;
