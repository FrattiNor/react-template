import classNames from 'classnames';
import styles from './index.module.less';
import TableBody from './TableBody';
import TableHead from './TableHead';

const TableDom = () => {
	console.log('TableDom re-render');

	return (
		<div className={classNames(styles['table'])}>
			<TableHead />
			<TableBody />
		</div>
	);
};

export default TableDom;
