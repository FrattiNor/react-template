import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';
import ResizeHandle from './ResizeHandle';

const TableHead: FC = () => {
	const { props, tableState, tableSecondaryState, tableDomRef } = useTableContext();
	const rowIndex = 0;
	const { columns, bordered } = props;
	const colMaxIndex = columns.length - 1;
	const headGridTemplateColumns = (() => {
		const { rightScrollBarWidth } = tableState;
		const { gridTemplateColumns } = tableSecondaryState;
		return rightScrollBarWidth > 0 ? gridTemplateColumns + ` minmax(${rightScrollBarWidth}px, 1fr)` : gridTemplateColumns;
	})();

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
							borderLeft: bordered !== true || colIndex !== 0 ? 0 : undefined,
							borderTop: rowIndex !== 0 ? 0 : undefined,
							borderRight: bordered !== true ? 0 : undefined,
						}}
					>
						<div className={styles['head-cell']}>{item.title}</div>
						<ResizeHandle columnKey={item.key} />
					</div>
				))}
				<div
					className={styles['head-cell-placeholder']}
					style={{
						gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
						gridColumn: `${colMaxIndex + 2}/${colMaxIndex + 3}`,
						borderRight: bordered !== true ? 0 : undefined,
					}}
				/>
			</div>
		</div>
	);
};

export default TableHead;
