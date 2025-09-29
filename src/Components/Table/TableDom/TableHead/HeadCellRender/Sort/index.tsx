import { SortDown, SortUp } from './icon';
import styles from './index.module.less';

const Sort = () => {
	return (
		<div className={styles['sort']}>
			<div className={styles['sort-up']}>{SortUp}</div>
			<div className={styles['sort-down']}> {SortDown}</div>
		</div>
	);
};

export default Sort;
