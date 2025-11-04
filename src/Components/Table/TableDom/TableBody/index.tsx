import { memo } from 'react';

import classNames from 'classnames';

import BodyRow from './BodyRow';
import styles from './index.module.less';
import { getRowKey } from '../../TableUtils';

import type { TableInstance } from '../../useTableInstance';

type Props<T> = Required<
	Pick<TableInstance<T>, 'splitColumnsArr' | 'bordered' | 'data' | 'rowKey' | 'gridTemplateColumns' | 'bodyRef' | 'rowHeight' | 'getStickyStyle'>
>;

const TableBody = <T,>(props: Props<T>) => {
	//  console.log('TableBody re-render');
	const { bordered, data, rowKey, gridTemplateColumns, bodyRef } = props;

	return (
		<div ref={bodyRef} className={classNames(styles['body'], { [styles['bordered']]: bordered })}>
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
