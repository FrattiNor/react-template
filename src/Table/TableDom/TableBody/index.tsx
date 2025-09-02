import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';
import MeasureColumnSize from './MeasureColumnSize';

const TableBody: FC = () => {
	const { props, tableTools, tableSecondaryState, tableDomRef } = useTableContext();
	const { columns, data, bordered } = props;
	const colMaxIndex = columns.length - 1;

	return (
		<div className={styles['body']} style={{ gridTemplateColumns: tableSecondaryState.gridTemplateColumns }} ref={tableDomRef.bodyRef}>
			<MeasureColumnSize />
			{data.map((dataItem, rowIndex) => {
				const rowKey = tableTools.getRowKey(dataItem, rowIndex);
				return (
					<div key={rowKey} className={styles['body-row']}>
						{columns.map((columnItem, colIndex) => (
							<div
								key={columnItem.key}
								className={styles['body-cell-wrapper']}
								style={{
									gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
									gridColumn: `${colIndex + 1}/${colIndex + 2}`,
									borderLeft: bordered !== true || colIndex !== 0 ? 0 : undefined,
									borderRight: bordered !== true ? 0 : undefined,
								}}
							>
								<div className={styles['body-cell']}>{columnItem.render(dataItem)}</div>
							</div>
						))}
						<div
							className={styles['body-cell-placeholder']}
							style={{
								gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
								gridColumn: `${colMaxIndex + 2}/${colMaxIndex + 3}`,
							}}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default TableBody;
