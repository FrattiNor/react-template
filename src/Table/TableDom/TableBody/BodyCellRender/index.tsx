import type { CSSProperties, FC } from 'react';
import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';

type Props = {
	rowIndex: number;
	colIndex: number;
	align?: 'left' | 'right' | 'center';
};

const BodyCellRender: FC<Props> = ({ rowIndex, colIndex, align }) => {
	const { tableProps, tableTools } = useTableContext();
	const { columnsFlat, data } = tableProps;
	const rowData = data[rowIndex];
	const column = columnsFlat[colIndex];
	const cellRenderValue = column.render(rowData, rowIndex);
	const title = tableTools.getCellTitle(cellRenderValue);
	const cellIsStr = typeof cellRenderValue === 'string' || typeof cellRenderValue === 'number';
	const alignStyle: CSSProperties = { justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' };

	return (
		<div className={styles['body-cell-render']} style={alignStyle} title={title}>
			<div className={cellIsStr ? styles['body-cell-render-str'] : styles['body-cell-render-block']}>{cellRenderValue}</div>
		</div>
	);
};

export default BodyCellRender;
