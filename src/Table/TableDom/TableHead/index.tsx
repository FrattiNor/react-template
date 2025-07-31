import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';

const TableHead: FC = () => {
	const { props, gridTemplateColumns, tableDomRef } = useTableContext();
	const { columns } = props;
	const rowIndex = 0;
	const rowIndexMax = 0;
	const colIndexMax = columns.length - 1;

	return (
		<div className={styles['head']} style={{ gridTemplateColumns }} ref={tableDomRef.headRef}>
			<div className={styles['head-row']}>
				{columns.map((item, colIndex) => (
					<div
						key={item.key}
						className={styles['head-cell-wrapper']}
						style={{
							gridRow: '1/2',
							gridColumn: `${colIndex + 1}/${colIndex + 2}`,
							borderTop: rowIndex === 0 ? 'unset' : undefined,
							borderLeft: colIndex === 0 ? 'unset' : undefined,
							borderBottom: rowIndexMax === 0 ? 'unset' : undefined,
							borderRight: colIndexMax === 0 ? 'unset' : undefined,
						}}
					>
						<div className={styles['head-cell']}>{item.title}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TableHead;
