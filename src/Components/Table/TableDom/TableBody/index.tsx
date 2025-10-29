import classNames from 'classnames';
import styles from './index.module.less';
import BodyRow from './BodyRow';
import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../useTableInstance';
import { getRowKey } from '../../TableUtils';
import { memo } from 'react';

const TableBody = <T extends TableDataItem>(props: TableInstance<T>) => {
	if (props.logRender?.body) console.log('TableBody re-render');
	const { bordered, data, rowKey, gridTemplateColumns, bodyRef } = props;

	return (
		<div ref={bodyRef} className={classNames(styles['body'], { [styles['bordered']]: bordered })}>
			<div className={classNames(styles['body-inner'])} style={{ gridTemplateColumns }}>
				{data?.map((dataItem, rowIndex) => {
					const key = getRowKey(rowKey, dataItem, rowIndex);
					return <BodyRow key={key} rowIndex={rowIndex} {...props} />;
				})}
			</div>
		</div>
	);
};

export default memo(TableBody) as typeof TableBody;
