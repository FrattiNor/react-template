import { type FC } from 'react';

import classNames from 'classnames';

import Dot from './Dot';
import styles from './index.module.less';

export type LoadingProps = {
	loading?: boolean;
	loadingMaxHeight?: number | 'unset';
};

const Loading: FC<LoadingProps> = ({ loading, loadingMaxHeight }) => {
	return (
		<div className={classNames(styles['loading-wrapper'], { [styles['active']]: loading === true })}>
			{loading === true && (
				<div className={styles['loading']} style={{ maxHeight: loadingMaxHeight }}>
					<div className={styles['dot-position']}>
						<Dot />
					</div>
				</div>
			)}
		</div>
	);
};

export default Loading;
