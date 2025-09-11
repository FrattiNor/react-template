import type { CSSProperties } from 'react';
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
	const { rightScrollBarWidth, pingedLeft, pingedRight } = tableState;
	const { fixedLeftObj, fixedRightObj } = tableSecondaryState;

	const getStickyStyleAndClassName = ({ colKey, type }: { colKey: string; type: 'head' | 'body' }) => {
		if (fixedLeftObj[colKey]) {
			let className = styles['sticky-left'];
			const { stickySize, leftSize } = fixedLeftObj[colKey];
			const style: CSSProperties = { left: stickySize };
			const pinged = pingedLeft >= leftSize;
			if (pinged) {
				style.zIndex = 10;
				className = classNames(className, styles['pinged']);
			}
			return { stickyStyle: style, stickyClassName: className };
		}

		if (fixedRightObj[colKey]) {
			let className = styles['sticky-right'];
			const { stickySize, rightSize } = fixedRightObj[colKey];
			const right = type === 'head' ? stickySize + rightScrollBarWidth : stickySize;
			const style: CSSProperties = { right };
			const pinged = pingedRight >= rightSize;
			if (pinged) {
				style.zIndex = 10;
				className = classNames(className, styles['pinged']);
			}
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
