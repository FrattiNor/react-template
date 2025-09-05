import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';
import MeasureColumnSize from './MeasureColumnSize';
import BodyRow from './BodyRow';

const TableBody: FC = () => {
	const { tableProps, tableTools, tableSecondaryState, tableDomRef } = useTableContext();
	const gridTemplateColumns = tableSecondaryState.gridTemplateColumnsArr.join(' ');

	return (
		<div className={styles['body']} style={{ gridTemplateColumns }} ref={tableDomRef.bodyRef}>
			<MeasureColumnSize />
			{tableProps.data?.map((dataItem, rowIndex) => {
				const rowKey = tableTools.getRowKey(dataItem, rowIndex);
				return <BodyRow key={rowKey} rowIndex={rowIndex} />;
			})}
		</div>
	);
};

export default TableBody;
