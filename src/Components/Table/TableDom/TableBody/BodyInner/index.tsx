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
		| 'getBodyStickyStyle'
		| 'getBodyCellBg'
		| 'bodyInnerRef'
		| 'bodyWidth'
		| 'columnsKeyIndexMap'
		| 'bodyRowClick'
		| 'bodyRowMouseEnter'
		| 'bodyRowMouseLeave'
	>
>;

const BodyInner = <T,>(props: Props<T>) => {
	const { data, rowKey, gridTemplateColumns, bodyInnerRef } = props;
	const isEmpty = (data ?? []).length === 0;

	return (
		<div ref={bodyInnerRef} className={styles['body-inner']} style={{ gridTemplateColumns: gridTemplateColumns + ` minmax(0px, 1fr)` }}>
			{isEmpty && <BodyEmpty bodyWidth={props.bodyWidth} />}
			{data?.map((dataItem, rowIndex) => (
				<BodyRow
					data={props.data}
					dataItem={dataItem}
					rowIndex={rowIndex}
					rowKey={props.rowKey}
					bordered={props.bordered}
					rowHeight={props.rowHeight}
					bodyRowClick={props.bodyRowClick}
					getBodyCellBg={props.getBodyCellBg}
					splitColumnsArr={props.splitColumnsArr}
					key={getRowKey(rowKey, dataItem, rowIndex)}
					bodyRowMouseEnter={props.bodyRowMouseEnter}
					bodyRowMouseLeave={props.bodyRowMouseLeave}
					getBodyStickyStyle={props.getBodyStickyStyle}
					columnsKeyIndexMap={props.columnsKeyIndexMap}
				/>
			))}
		</div>
	);
};

export default memo(BodyInner) as typeof BodyInner;
