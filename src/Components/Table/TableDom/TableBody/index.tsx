import { memo } from 'react';

import classNames from 'classnames';

import BodyRow from './BodyRow';
import styles from './index.module.less';
import { getRowKey } from '../../TableUtils';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../useTableInstance';

type Props<T extends TableDataItem> = Required<
	Pick<TableInstance<T>, 'flatColumns' | 'bordered' | 'logRender' | 'data'> & Pick<TableInstance<T>, 'rowKey' | 'gridTemplateColumns' | 'bodyRef'>
>;

const TableBody = <T extends TableDataItem>(props: Props<T>) => {
	if (props.logRender?.body) console.log('TableBody re-render');
	const { bordered, data, rowKey, gridTemplateColumns, bodyRef } = props;

	return (
		<div ref={bodyRef} className={classNames(styles['body'], { [styles['bordered']]: bordered })}>
			<div className={classNames(styles['body-inner'])} style={{ gridTemplateColumns }}>
				{data.map((dataItem, rowIndex) => {
					const key = getRowKey(rowKey, dataItem, rowIndex);
					return (
						<BodyRow
							key={key}
							data={props.data}
							rowIndex={rowIndex}
							bordered={props.bordered}
							logRender={props.logRender}
							flatColumns={props.flatColumns}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default memo(TableBody) as typeof TableBody;
