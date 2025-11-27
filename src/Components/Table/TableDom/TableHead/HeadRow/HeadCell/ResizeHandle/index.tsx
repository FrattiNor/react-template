import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';

import type { TableInstance } from '../../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'startResize' | 'resizeFlag'>> & {
	colIndexStart: number;
	colIndexEnd: number;
	columnKey: string;
};

const ResizeHandle = <T,>(props: Props<T>) => {
	const { startResize, columnKey, colIndexStart, colIndexEnd, resizeFlag } = props;
	const active = columnKey === resizeFlag?.activeKey;

	return (
		<div
			onMouseDown={(e) => startResize({ e, columnKey, colIndexStart, colIndexEnd })}
			className={classNames(styles['resize-handle'], { [styles['active']]: active })}
		/>
	);
};

export default memo(ResizeHandle) as typeof ResizeHandle;
