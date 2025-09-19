import { memo, type CSSProperties } from 'react';

import Filter from './Filter';
import styles from './index.module.less';
import propsAreEqual, { getProps } from './propsAreEqual';
import Sort from './Sort';
import { getCellTitle } from '../../../TableUtils';

import type { InnerColumn, InnerColumnGroup } from '../../../TableTypes/typeColumn';

export type Props = {
	column: InnerColumn<any> | InnerColumnGroup<any>;
	align?: 'left' | 'right' | 'center';
	tableRef: React.RefObject<HTMLDivElement | null>;
};

const HeadCellRender = (props: Props) => {
	const { column, align, tableRef } = getProps(props);

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
			{haveFilter && <Filter tableRef={tableRef} />}
		</div>
	);
};

// export default HeadCellRender;
export default memo(HeadCellRender, propsAreEqual) as typeof HeadCellRender;
