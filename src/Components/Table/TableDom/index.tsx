import classNames from 'classnames';
import styles from './index.module.less';
import TableBody from './TableBody';
import TableHead from './TableHead';
import type { FC } from 'react';
import { useTableContext } from '../TableContext';

const TableDom: FC = () => {
	const { props } = useTableContext();
	if (props.logRender?.tableDom) console.log('TableDom re-render');
	const { bordered } = props;
	return (
		<div className={classNames(styles['table'], { [styles['bordered']]: bordered })}>
			<TableHead />
			<TableBody />
		</div>
	);
};

export default TableDom;
