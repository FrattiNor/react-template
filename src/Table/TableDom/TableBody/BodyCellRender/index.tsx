import { memo, type CSSProperties } from 'react';
import styles from './index.module.less';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import { getCellTitle } from '../../../TableUtils';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	colIndex: number;
	align?: 'left' | 'right' | 'center';
};

const BodyCellRender = <T extends TableDataItem>(props: Props<T>) => {
	const { colIndex, rowIndex, align } = getProps(props);
	const { data, columnsFlat } = getInstanceProps(props);

	const rowData = data[rowIndex];
	const column = columnsFlat[colIndex];
	const cellRenderValue = column.render(rowData, rowIndex);
	const title = getCellTitle(cellRenderValue);
	const cellIsStr = typeof cellRenderValue === 'string' || typeof cellRenderValue === 'number';
	const alignStyle: CSSProperties = { justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' };

	return (
		<div className={styles['body-cell-render']} style={alignStyle} title={title}>
			<div className={cellIsStr ? styles['body-cell-render-str'] : styles['body-cell-render-block']}>{cellRenderValue}</div>
		</div>
	);
};

export default memo(BodyCellRender, propsAreEqual) as typeof BodyCellRender;
