import { memo, useMemo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';

import type { TableInstance } from '../../useTableInstance';
type Props<T> = Required<
	Pick<TableInstance<T>, 'fixedLeftObj' | 'fixedRightObj' | 'pingedLeftEnd' | 'pingedRightStart' | 'v_scrollbar' | 'h_scrollbar'>
>;

// TODO empty时
const TableSticky = <T,>(props: Props<T>) => {
	const { fixedLeftObj, fixedRightObj, pingedLeftEnd, pingedRightStart, v_scrollbar, h_scrollbar } = props;

	const stickyLeftWidth = useMemo(() => {
		if (typeof pingedLeftEnd === 'number') {
			const size = fixedLeftObj[pingedLeftEnd]?.size;
			const stickySize = fixedLeftObj[pingedLeftEnd]?.stickySize;
			if (typeof size === 'number' && typeof stickySize === 'number') {
				return size + stickySize;
			}
		}
		return 0;
	}, [fixedLeftObj, pingedLeftEnd]);

	const stickyRightWidth = useMemo(() => {
		if (typeof pingedRightStart === 'number') {
			const size = fixedRightObj[pingedRightStart]?.size;
			const stickySize = fixedRightObj[pingedRightStart]?.stickySize;
			if (typeof size === 'number' && typeof stickySize === 'number') {
				return size + stickySize;
			}
		}
		return 0;
	}, [fixedRightObj, pingedRightStart]);

	return (
		<div
			style={{ bottom: h_scrollbar.width, right: stickyRightWidth + v_scrollbar.width, left: stickyLeftWidth }}
			className={classNames(styles['table-sticky'], {
				[styles['sticky-left']]: stickyLeftWidth > 0,
				[styles['sticky-right']]: stickyRightWidth > 0,
			})}
		/>
	);
};

export default memo(TableSticky) as typeof TableSticky;
