import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';

type Props = {
	columnKey: string;
};

const ResizeHandle: FC<Props> = ({ columnKey }) => {
	const { tableResize } = useTableContext();
	return <div className={styles['resize-handle']} onMouseDown={(e) => tableResize.startResize(e, columnKey)} />;
};

export default ResizeHandle;
