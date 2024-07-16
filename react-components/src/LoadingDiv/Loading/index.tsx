import type { FC } from 'react';

import classNames from 'classnames';

import Circle from './Circle';
import Dot from './Dot';
import styles from './index.module.less';

export type LoadingProps = {
    loading?: boolean;
    loadingMaxHeight?: number | 'unset';
    loadingType?: 'dot' | 'circle';
};

const Loading: FC<LoadingProps> = ({ loading, loadingMaxHeight, loadingType = 'dot' }) => {
    return (
        <div className={classNames(styles['loading-wrapper'], { [styles['active']]: loading === true })}>
            {loading === true && (
                <div className={styles['loading']} style={{ maxHeight: loadingMaxHeight }}>
                    <div className={styles['dot-position']}>{loadingType === 'dot' ? <Dot /> : <Circle />}</div>
                </div>
            )}
        </div>
    );
};

export default Loading;
