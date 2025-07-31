import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';

const TableHead: FC = () => {
	const { props, gridTemplateColumns, tableDomRef } = useTableContext();
	const { rightScrollBarWidth } = tableDomRef;
	const headGridTemplateColumns = rightScrollBarWidth > 0 ? gridTemplateColumns + ` ${rightScrollBarWidth}px` : gridTemplateColumns;
	const { columns, bordered } = props;
	const rowIndex = 0;

	return (
		<div className={styles['head']} style={{ gridTemplateColumns: headGridTemplateColumns }} ref={tableDomRef.headRef}>
			<div className={styles['head-row']}>
				{columns.map((item, colIndex) => (
					<div
						key={item.key}
						className={styles['head-cell-wrapper']}
						style={{
							gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
							gridColumn: `${colIndex + 1}/${colIndex + 2}`,
							borderLeft: bordered !== true || colIndex !== 0 ? 'unset' : undefined,
							borderTop: rowIndex !== 0 ? 'unset' : undefined,
							borderRight: bordered !== true ? 'unset' : undefined,
						}}
					>
						<div className={styles['head-cell']}>{item.title}</div>
					</div>
				))}
				<div className={styles['head-cell-placeholder']} style={{ borderLeft: 'unset', borderRight: bordered !== true ? 'unset' : undefined }} />
			</div>
		</div>
	);
};

export default TableHead;
