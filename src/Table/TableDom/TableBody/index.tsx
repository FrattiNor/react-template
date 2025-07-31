import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';

const TableBody: FC = () => {
	const { props, gridTemplateColumns, getRowKey, tableDomRef } = useTableContext();
	const { columns, data } = props;
	const rowIndexMax = data.length - 1;
	const colIndexMax = columns.length - 1;

	return (
		<div className={styles['body']} style={{ gridTemplateColumns }} ref={tableDomRef.bodyRef}>
			{data.map((dataItem, rowIndex) => {
				const rowKey = getRowKey(dataItem, rowIndex);
				return (
					<div key={rowKey} className={styles['body-row']}>
						{columns.map((columnItem, colIndex) => (
							<div
								key={columnItem.key}
								className={styles['body-cell-wrapper']}
								style={{
									gridColumn: `${colIndex + 1}/${colIndex + 2}`,
									gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
									borderTop: rowIndex === 0 ? 'unset' : undefined,
									borderLeft: colIndex === 0 ? 'unset' : undefined,
									borderBottom: rowIndexMax === 0 ? 'unset' : undefined,
									borderRight: colIndexMax === 0 ? 'unset' : undefined,
								}}
							>
								<div className={styles['body-cell']}>{columnItem.render(dataItem)}</div>
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
};

export default TableBody;
