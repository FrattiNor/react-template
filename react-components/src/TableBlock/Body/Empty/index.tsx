import styles from './index.module.less';
import Empty from '../../../Empty';

const BodyEmpty = () => {
	return (
		<div className={styles['empty-wrapper']}>
			<div className={styles['space-occupying']} />
			<div className={styles['empty']}>
				<Empty />
			</div>
		</div>
	);
};

export default BodyEmpty;
