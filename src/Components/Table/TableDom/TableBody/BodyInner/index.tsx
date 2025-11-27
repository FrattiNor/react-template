import { memo } from 'react';

import BodyEmpty from './BodyEmpty';
import BodyRow from './BodyRow';
import styles from './index.module.less';
import { getRowKey } from '../../../TableUtils';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<
	Pick<
		TableInstance<T>,
		| 'splitColumnsArr'
		| 'bordered'
		| 'data'
		| 'rowKey'
		| 'gridTemplateColumns'
		| 'rowHeight'
		| 'getStickyStyle'
		| 'getBodyCellBg'
		| 'bodyInnerRef'
		| 'h_scrollbar'
	>
>;

const BodyInner = <T,>(props: Props<T>) => {
	const { data, rowKey, gridTemplateColumns, bodyInnerRef } = props;
	const isEmpty = (data ?? []).length === 0;

	return (
		<div ref={bodyInnerRef} className={styles['body-inner']} style={{ gridTemplateColumns: gridTemplateColumns + ` minmax(0px, 1fr)` }}>
			{isEmpty && <BodyEmpty h_scrollbar={props.h_scrollbar} />}
			{!isEmpty &&
				data?.map((dataItem, rowIndex) => (
					<BodyRow
						dataItem={dataItem}
						rowIndex={rowIndex}
						bordered={props.bordered}
						rowHeight={props.rowHeight}
						getBodyCellBg={props.getBodyCellBg}
						getStickyStyle={props.getStickyStyle}
						splitColumnsArr={props.splitColumnsArr}
						key={getRowKey(rowKey, dataItem, rowIndex)}
					/>
				))}
		</div>
	);
};

export default memo(BodyInner) as typeof BodyInner;
