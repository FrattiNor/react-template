import { useTableContext } from '../../TableContext';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const Loading: FC = () => {
    const { outerProps } = useTableContext();
    const { loading } = outerProps;

    return (
        <div className={classNames(styles['loading-wrapper'], { [styles['active']]: loading === true })}>
            {loading === true && (
                <div className={styles['loading']}>
                    <div className={styles['dot-position']}>
                        <div className={styles['dot-wrapper']}>
                            <div className={styles['dot']} />
                            <div className={styles['dot']} />
                            <div className={styles['dot']} />
                            <div className={styles['dot']} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loading;
