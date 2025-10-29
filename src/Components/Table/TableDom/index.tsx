import classNames from 'classnames';
import styles from './index.module.less';
import TableBody from './TableBody';
import TableHead from './TableHead';
import type { TableInstance } from '../useTableInstance';
import type { TableDataItem } from '../TableTypes/type';
import { memo } from 'react';

const TableDom = <T extends TableDataItem>(props: TableInstance<T>) => {
	if (props.logRender?.tableDom) console.log('TableDom re-render');
	const { bordered } = props;
	return (
		<div className={classNames(styles['table'], { [styles['bordered']]: bordered })}>
			<TableHead {...props} />
			<TableBody {...props} />
		</div>
	);
};

export default memo(TableDom) as typeof TableDom;
