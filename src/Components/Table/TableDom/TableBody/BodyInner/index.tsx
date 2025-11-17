import { memo } from 'react';

import classNames from 'classnames';

import BodyRow from './BodyRow';
import styles from './index.module.less';
import { getRowKey } from '../../../TableUtils';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<
	Pick<TableInstance<T>, 'splitColumnsArr' | 'bordered' | 'data' | 'rowKey' | 'gridTemplateColumns' | 'rowHeight' | 'getStickyStyle'>
>;

const BodyInner = <T,>(props: Props<T>) => {
	const { data, rowKey, gridTemplateColumns } = props;

	return (
		<div className={classNames(styles['body-inner'])} style={{ gridTemplateColumns: gridTemplateColumns + ` minmax(0px, 1fr)` }}>
			{data?.map((dataItem, rowIndex) => (
				<BodyRow
					dataItem={dataItem}
					rowIndex={rowIndex}
					bordered={props.bordered}
					rowHeight={props.rowHeight}
					getStickyStyle={props.getStickyStyle}
					splitColumnsArr={props.splitColumnsArr}
					key={getRowKey(rowKey, dataItem, rowIndex)}
				/>
			))}
		</div>
	);
};

export default memo(BodyInner) as typeof BodyInner;
