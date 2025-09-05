import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';
import HeadRow from './HeadRow';

const TableHead: FC = () => {
	const { tableState, tableSecondaryState, tableDomRef } = useTableContext();
	const headGridTemplateColumns = (() => {
		const { rightScrollBarWidth } = tableState;
		const { gridTemplateColumns } = tableSecondaryState;
		return rightScrollBarWidth > 0 ? gridTemplateColumns + ` minmax(${rightScrollBarWidth}px, 1fr)` : gridTemplateColumns;
	})();

	return (
		<div className={styles['head']} style={{ gridTemplateColumns: headGridTemplateColumns }} ref={tableDomRef.headRef}>
			<HeadRow rowIndex={0} />
		</div>
	);
};

export default TableHead;
