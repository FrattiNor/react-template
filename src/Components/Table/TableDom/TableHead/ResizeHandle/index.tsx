import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	colKey: string;
	colIndexs: [number] | [number, number];
};

const ResizeHandle = <T extends TableDataItem>(props: Props<T>) => {
	const { colKey, colIndexs } = getProps(props);
	const { resizeFlag, startResize } = getInstanceProps(props);
	const active = colKey === resizeFlag?.activeKey;

	return (
		<div className={classNames(styles['resize-handle'], { [styles['active']]: active })} onMouseDown={(e) => startResize(e, colKey, colIndexs)} />
	);
};

export default memo(ResizeHandle, propsAreEqual) as typeof ResizeHandle;
