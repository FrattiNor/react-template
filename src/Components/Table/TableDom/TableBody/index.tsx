import { memo } from 'react';

import classNames from 'classnames';

import BodyRow from './BodyRow';
import styles from './index.module.less';
import MeasureRow from './MeasureRow';
import { getRowKey } from '../../TableUtils';

import type { TableInstance } from '../../useTableInstance';

type Props<T> = Required<
	Pick<
		TableInstance<T>,
		| 'splitColumnsArr'
		| 'splitColumnsArr_01'
		| 'bordered'
		| 'data'
		| 'rowKey'
		| 'gridTemplateColumns'
		| 'bodyRef'
		| 'rowHeight'
		| 'getStickyStyle'
		| 'setSizeCacheMap'
	>
>;

const TableBody = <T,>(props: Props<T>) => {
	//  console.log('TableBody re-render');
	const { bordered, data, rowKey, gridTemplateColumns, bodyRef } = props;

	return (
		<div ref={bodyRef} className={classNames(styles['body'], { [styles['bordered']]: bordered })}>
			<MeasureRow splitColumnsArr_01={props.splitColumnsArr_01} setSizeCacheMap={props.setSizeCacheMap} />

			<div className={classNames(styles['body-inner'])} style={{ gridTemplateColumns: gridTemplateColumns + ` minmax(0px, 1fr)` }}>
				{data.map((dataItem, rowIndex) => {
					const key = getRowKey(rowKey, dataItem, rowIndex);
					return (
						<BodyRow
							key={key}
							data={props.data}
							rowIndex={rowIndex}
							bordered={props.bordered}
							rowHeight={props.rowHeight}
							getStickyStyle={props.getStickyStyle}
							splitColumnsArr={props.splitColumnsArr}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default memo(TableBody) as typeof TableBody;
