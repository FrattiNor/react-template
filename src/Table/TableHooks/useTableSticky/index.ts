import { useCallback, type CSSProperties } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableDomRef from '../useTableDomRef';
import type useTableProps from '../useTableProps';
import type useTableSecondaryState from '../useTableSecondaryState';
import type useTableState from '../useTableState';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableState: ReturnType<typeof useTableState>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableSecondaryState: ReturnType<typeof useTableSecondaryState>;
};

// 表格左右固定
const useTableSticky = <T extends TableDataItem>({ tableSecondaryState, tableState, tableProps }: Props<T>) => {
	const { bordered } = tableProps;
	const { fixedLeftObj, fixedRightObj } = tableSecondaryState;
	const { V_ScrollbarWidth, pingedLeftFirst, pingedLeftLast, pingedRightFirst, pingedRightLast } = tableState;

	const getStickyStyleAndClassName = useCallback(
		({ colIndexs, type }: { colIndexs: [number, number] | [number]; type: 'head' | 'body' }) => {
			const colStartIndex = colIndexs[0];
			const colEndIndex = colIndexs[colIndexs.length - 1];

			if (fixedLeftObj[colStartIndex]) {
				let className = classNames(styles['sticky-left'], { [styles['bordered']]: bordered });
				const { stickySize } = fixedLeftObj[colStartIndex];
				const style: CSSProperties = { left: stickySize };
				const pinged = colStartIndex <= (pingedLeftLast ?? -1);
				const firstPinged = colEndIndex === pingedLeftFirst;
				const lastPinged = colEndIndex === pingedLeftLast;
				if (pinged) className = classNames(className, styles['pinged']);
				if (firstPinged) className = classNames(className, styles['first-pinged']);
				if (lastPinged) className = classNames(className, styles['last-pinged']);
				return { stickyStyle: style, stickyClassName: className, sticky: true };
			}

			if (fixedRightObj[colEndIndex]) {
				let className = classNames(styles['sticky-right'], { [styles['bordered']]: bordered });
				const { stickySize } = fixedRightObj[colEndIndex];
				const right = type === 'head' ? stickySize + V_ScrollbarWidth : stickySize;
				const style: CSSProperties = { right };
				const pinged = colEndIndex >= (pingedRightFirst ?? Infinity);
				const firstPinged = colStartIndex === pingedRightFirst;
				const lastPinged = colStartIndex === pingedRightLast;
				if (pinged) className = classNames(className, styles['pinged']);
				if (firstPinged) className = classNames(className, styles['first-pinged']);
				if (lastPinged && V_ScrollbarWidth <= 0) className = classNames(className, styles['last-pinged']);
				return { stickyStyle: style, stickyClassName: className, sticky: true };
			}

			return {
				sticky: false,
				stickyStyle: undefined,
				stickyClassName: '',
			};
		},
		[bordered, fixedLeftObj, fixedRightObj, V_ScrollbarWidth, pingedLeftFirst, pingedLeftLast, pingedRightFirst, pingedRightLast],
	);

	return { getStickyStyleAndClassName };
};

export default useTableSticky;
