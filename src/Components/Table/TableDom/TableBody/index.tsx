import classNames from 'classnames';
import styles from './index.module.less';

const TableBody = () => {
	console.log('TableBody re-render');
	return <div className={classNames(styles['body'])}></div>;
};

export default TableBody;
