import type { FC } from 'react';
import { useTableContext } from '../../../../TableContext';
import styles from './index.module.less';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const BodyCellRender: FC<Props> = ({ rowIndex, colIndex }) => {
	const { tableProps } = useTableContext();
	const { columns, data } = tableProps;
	const rowData = data[rowIndex];
	const column = columns[colIndex];
	const cellRenderValue = column.render(rowData);

	if (typeof cellRenderValue === 'string' || typeof cellRenderValue === 'number') {
		return (
			<div className={styles['body-cell-render']}>
				<div className={styles['body-cell-render-str']}>{cellRenderValue}</div>
			</div>
		);
	}

	return (
		<div className={styles['body-cell-render']}>
			<div className={styles['body-cell-render-block']}>{cellRenderValue}</div>
		</div>
	);
};

export default BodyCellRender;
