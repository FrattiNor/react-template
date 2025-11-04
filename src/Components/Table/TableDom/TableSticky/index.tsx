import { memo, useMemo } from 'react';

import styles from './index.module.less';

import type { TableInstance } from '../../useTableInstance';

type Props<T> = Required<
	Pick<TableInstance<T>, 'fixedLeftObj' | 'fixedRightObj' | 'pingedLeftEnd' | 'pingedRightEnd' | 'v_ScrollbarWidth' | 'h_ScrollbarWidth'>
>;

const TableSticky = <T,>(props: Props<T>) => {
	const { fixedLeftObj, fixedRightObj, pingedLeftEnd, pingedRightEnd, v_ScrollbarWidth, h_ScrollbarWidth } = props;

	const stickyLeftWidth = useMemo(() => {
		if (typeof pingedLeftEnd === 'number') {
			return fixedLeftObj[pingedLeftEnd].stickySize + fixedLeftObj[pingedLeftEnd].size;
		}
		return undefined;
	}, [fixedLeftObj, pingedLeftEnd]);

	const stickyRightWidth = useMemo(() => {
		if (typeof pingedRightEnd === 'number') {
			return fixedRightObj[pingedRightEnd].stickySize + fixedRightObj[pingedRightEnd].size;
		}
		return undefined;
	}, [fixedRightObj, pingedRightEnd]);

	if (typeof stickyLeftWidth !== 'number' && typeof stickyRightWidth !== 'number') return null;

	return (
		<div className={styles['table-sticky']} style={{ bottom: h_ScrollbarWidth, right: v_ScrollbarWidth }}>
			{typeof stickyLeftWidth === 'number' && <div className={styles['sticky-left']} style={{ width: stickyLeftWidth }}></div>}
			{typeof stickyRightWidth === 'number' && <div className={styles['sticky-right']} style={{ width: stickyRightWidth }}></div>}
		</div>
	);
};

export default memo(TableSticky) as typeof TableSticky;
