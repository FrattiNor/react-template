import styles from './index.module.less';
import classNames from 'classnames';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo } from 'react';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	colKey: string;
	colIndexs: [number] | [number, number];
};

const ResizeHandle = <T extends TableDataItem>({ instance, colKey, colIndexs }: Props<T>) => {
	const { resizeFlag } = instance.tableState;
	const { startResize } = instance.tableResize;
	const active = colKey === resizeFlag?.activeKey;

	return <div className={classNames(styles['resize-handle'], { [styles['active']]: active })} onMouseDown={(e) => startResize(e, colKey, colIndexs)} />;
};

export default memo(ResizeHandle) as typeof ResizeHandle;
