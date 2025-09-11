import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';
import HeadRow from './HeadRow';

const TableHead: FC = () => {
	const { tableState, tableSecondaryState, tableDomRef } = useTableContext();
	const headGridTemplateColumns = (() => {
		const { rightScrollBarWidth } = tableState;
		const { gridTemplateColumnsArr } = tableSecondaryState;
		return rightScrollBarWidth > 0 ? [...gridTemplateColumnsArr, `minmax(${rightScrollBarWidth}px, 1fr)`].join(' ') : gridTemplateColumnsArr.join(' ');
	})();

	return (
		<div className={styles['head']} style={{ gridTemplateColumns: headGridTemplateColumns }} ref={tableDomRef.headRef}>
			<HeadRow rowIndex={0} />
		</div>
	);
};

export default TableHead;
