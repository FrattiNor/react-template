import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';
import classNames from 'classnames';

type Props = {
	colKey: string;
};

const ResizeHandle: FC<Props> = ({ colKey }) => {
	const { tableResize } = useTableContext();
	return <div className={classNames(styles['resize-handle'], { [styles['active']]: tableResize.resizeKey === colKey })} onMouseDown={(e) => tableResize.startResize(e, colKey)} />;
};

export default ResizeHandle;
