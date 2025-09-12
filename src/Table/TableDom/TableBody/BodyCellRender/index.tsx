import type { CSSProperties, FC } from 'react';
import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';

type Props = {
	rowIndex: number;
	colIndex: number;
	align?: 'left' | 'right' | 'center';
};

const BodyCellRender: FC<Props> = ({ rowIndex, colIndex, align }) => {
	const { tableProps } = useTableContext();
	const { columnsFlat, data } = tableProps;
	const rowData = data[rowIndex];
	const column = columnsFlat[colIndex];
	const cellRenderValue = column.render(rowData, rowIndex);

	const alignStyle: CSSProperties = { justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' };

	if (typeof cellRenderValue === 'string' || typeof cellRenderValue === 'number') {
		return (
			<div className={styles['body-cell-render']} style={alignStyle}>
				<div className={styles['body-cell-render-str']}>{cellRenderValue}</div>
			</div>
		);
	}

	return (
		<div className={styles['body-cell-render']} style={alignStyle}>
			<div className={styles['body-cell-render-block']}>{cellRenderValue}</div>
		</div>
	);
};

export default BodyCellRender;
