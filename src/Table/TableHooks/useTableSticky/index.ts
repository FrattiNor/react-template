import { useMemo, type CSSProperties } from 'react';
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
	const { rightScrollBarWidth, scrollLeft, scrollRight } = tableState;

	const { leftPingedIndex, rightPingedIndex } = useMemo(() => {
		let leftPingedIndex: undefined | number = undefined;
		let rightPingedIndex: undefined | number = undefined;
		Object.values(fixedLeftObj).forEach(({ pingedSize, index }) => {
			const pinged = scrollLeft > pingedSize;
			if (pinged && index > (leftPingedIndex ?? -1)) leftPingedIndex = index;
		});
		Object.values(fixedRightObj).forEach(({ pingedSize, index }) => {
			const pinged = scrollRight > pingedSize;
			if (pinged && index < (rightPingedIndex ?? Infinity)) rightPingedIndex = index;
		});
		return { leftPingedIndex, rightPingedIndex };
	}, [fixedLeftObj, fixedRightObj, scrollLeft, scrollRight]);

	const getStickyStyleAndClassName = ({ colKey, type }: { colKey: string; type: 'head' | 'body' }) => {
		if (fixedLeftObj[colKey]) {
			let className = styles['sticky-left'];
			const { stickySize, index } = fixedLeftObj[colKey];
			const style: CSSProperties = { left: stickySize };
			const pinged = index <= (leftPingedIndex ?? -1);
			const lastPinged = index === leftPingedIndex;
			if (pinged) style.zIndex = 10;
			if (lastPinged) className = classNames(className, styles['last-pinged']);
			return { stickyStyle: style, stickyClassName: className };
		}

		if (fixedRightObj[colKey]) {
			let className = styles['sticky-right'];
			const { stickySize, index } = fixedRightObj[colKey];
			const right = type === 'head' ? stickySize + rightScrollBarWidth : stickySize;
			const style: CSSProperties = { right };
			const pinged = index >= (rightPingedIndex ?? Infinity);
			const lastPinged = index === rightPingedIndex;
			if (pinged) style.zIndex = 10;
			if (lastPinged) className = classNames(className, styles['last-pinged']);
			return { stickyStyle: style, stickyClassName: className };
		}

		return {
			stickyStyle: undefined,
			stickyClassName: undefined,
		};
	};

	return { getStickyStyleAndClassName };
};

export default useTableSticky;
