import { memo, type CSSProperties } from 'react';

import Filter from './Filter';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';
import Sort from './Sort';
import { getCellTitle } from '../../../TableUtils';

import type { TableDataItem, TableInstance } from '../../../TableTypes/type';
import type { InnerColumn, InnerColumnGroup } from '../../../TableTypes/typeColumn';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	align?: 'left' | 'right' | 'center';
	column: InnerColumn<any> | InnerColumnGroup<any>;
};

const HeadCellRender = <T extends TableDataItem>(props: Props<T>) => {
	const { column, align } = getProps(props);
	const { tableRef, filterOpenKey, setFilterOpenKey } = getInstanceProps(props);

	const haveSort = !!column.sort;
	const haveFilter = !!column.filter;
	const cellRenderValue = column.title;
	const title = getCellTitle(cellRenderValue);
	const cellIsStr = typeof cellRenderValue === 'string' || typeof cellRenderValue === 'number';
	const alignStyle: CSSProperties = { justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' };

	return (
		<div className={styles['head-cell-render-wrapper']} title={title}>
			<div className={styles['head-cell-render']} style={alignStyle}>
				<div className={cellIsStr ? styles['head-cell-render-str'] : styles['head-cell-render-block']}>{cellRenderValue}</div>
			</div>
			{haveSort && <Sort />}
			{haveFilter && <Filter tableRef={tableRef} column={column} filterOpenKey={filterOpenKey} setFilterOpenKey={setFilterOpenKey} />}
		</div>
	);
};

export default memo(HeadCellRender, propsAreEqual) as typeof HeadCellRender;
