/* eslint-disable react-compiler/react-compiler */
import { memo, useMemo, type CSSProperties } from 'react';

import HighlightText from './HighlightText';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';
import { getCellTitle } from '../../../../TableUtils';

import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	colIndex: number;
	onCellTitle: string | undefined;
	align?: 'left' | 'right' | 'center';
};

const BodyCellRender = <T extends TableDataItem>(props: Props<T>) => {
	const { onCellTitle, colIndex, rowIndex, align } = getProps(props);
	const { datasource, columnsFlat } = getInstanceProps(props);

	const rowData = datasource[rowIndex];
	const column = columnsFlat[colIndex];
	const columnFilter = column.filter ? column.filter(column.key) : undefined;
	const columnHighlightKeywords = useMemo(() => columnFilter?.highlightKeywords, [JSON.stringify(columnFilter?.highlightKeywords)]);
	const renderHighlightText = (text: string) => (
		<HighlightText columnHighlightKeywords={columnHighlightKeywords} instance={props.instance}>
			{text}
		</HighlightText>
	);
	const cellRenderValue = column.render(rowData, { index: rowIndex, renderHighlightText });
	const title = onCellTitle ?? getCellTitle(cellRenderValue);
	const cellIsStr = typeof cellRenderValue === 'string' || typeof cellRenderValue === 'number';
	const alignStyle: CSSProperties = { justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' };

	return (
		<div className={styles['body-cell-render']} style={alignStyle} title={title}>
			<div className={cellIsStr ? styles['body-cell-render-str'] : styles['body-cell-render-block']}>
				{cellIsStr ? renderHighlightText(String(cellRenderValue)) : cellRenderValue}
			</div>
		</div>
	);
};

export default memo(BodyCellRender, propsAreEqual) as typeof BodyCellRender;
