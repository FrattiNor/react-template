import type { FC } from 'react';

import classNames from 'classnames';

import Circle from './Circle';
import Dot from './Dot';
import styles from './index.module.less';

export type LoadingProps = {
    loading?: boolean;
    maxHeight?: number | 'unset';
    type?: 'dot' | 'circle';
};

const Loading: FC<LoadingProps> = ({ loading, maxHeight: _maxHeight = 400, type = 'dot' }) => {
    const maxHeight = _maxHeight === 'unset' ? undefined : _maxHeight;

    return (
        <div className={classNames(styles['loading-wrapper'], { [styles['active']]: loading === true })}>
            {loading === true && (
                <div className={styles['loading']} style={{ maxHeight }}>
                    <div className={styles['dot-position']}>{type === 'dot' ? <Dot /> : <Circle />}</div>
                </div>
            )}
        </div>
    );
};

export default Loading;
