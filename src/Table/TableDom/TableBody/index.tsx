import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';

const TableBody: FC = () => {
	const { props, getRowKey, gridTemplateColumns, tableDomRef } = useTableContext();
	const { columns, data, bordered } = props;

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
									gridRow: `${rowIndex + 2}/${rowIndex + 3}`,
									gridColumn: `${colIndex + 1}/${colIndex + 2}`,
									borderLeft: bordered !== true || colIndex !== 0 ? 'unset' : undefined,
									borderTop: 'unset',
									borderRight: bordered !== true ? 'unset' : undefined,
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
