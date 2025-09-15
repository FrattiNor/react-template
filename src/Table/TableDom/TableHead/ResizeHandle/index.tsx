import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';
import classNames from 'classnames';

type Props = {
	colKey: string;
	colIndexs: [number] | [number, number];
};

const ResizeHandle: FC<Props> = ({ colKey, colIndexs }) => {
	const { tableResize, tableState } = useTableContext();

	const active = colKey === tableState.resizeFlag?.activeKey;

	return <div className={classNames(styles['resize-handle'], { [styles['active']]: active })} onMouseDown={(e) => tableResize.startResize(e, colKey, colIndexs)} />;
};

export default ResizeHandle;
