import classNames from 'classnames';
import styles from './index.module.less';

const TableHead = () => {
	console.log('TableHead re-render');
	return <div className={classNames(styles['head'])}></div>;
};

export default TableHead;
