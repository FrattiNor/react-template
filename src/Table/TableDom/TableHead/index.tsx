import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';
import HeadRow from './HeadRow';
import HeadGroupRow from './HeadGroupRow';

const TableHead: FC = () => {
	const { tableState, tableSecondaryState, tableDomRef, tableProps } = useTableContext();
	const headGridTemplateColumns = (() => {
		const { rightScrollBarWidth } = tableState;
		const { gridTemplateColumnsArr } = tableSecondaryState;
		return rightScrollBarWidth > 0 ? [...gridTemplateColumnsArr, `minmax(${rightScrollBarWidth}px, 1fr)`].join(' ') : gridTemplateColumnsArr.join(' ');
	})();

	return (
		<div className={styles['head']} style={{ gridTemplateColumns: headGridTemplateColumns }} ref={tableDomRef.headRef}>
			{tableProps.columnGroups.map((_, rowIndex) => (
				<HeadGroupRow key={rowIndex} rowIndex={rowIndex} />
			))}
			<HeadRow rowIndex={tableProps.columnGroups.length} />
		</div>
	);
};

export default TableHead;
