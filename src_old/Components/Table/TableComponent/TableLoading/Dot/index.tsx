import styles from './index.module.less';

const Dot = () => {
	return (
		<div className={styles['dot-wrapper']}>
			<div className={styles['dot']} />
			<div className={styles['dot']} />
			<div className={styles['dot']} />
			<div className={styles['dot']} />
		</div>
	);
};

export default Dot;
