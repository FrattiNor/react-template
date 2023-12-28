import { useContext2 } from '../../Context2';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const Loading: FC = () => {
    const { outerProps } = useContext2();
    const { loading } = outerProps;

    return (
        <div className={classNames(styles['loading'], { [styles['active']]: loading === true })}>
            {loading === true && (
                <div className={styles['dot-position']}>
                    <div className={styles['dot-wrapper']}>
                        <div className={styles['dot']} />
                        <div className={styles['dot']} />
                        <div className={styles['dot']} />
                        <div className={styles['dot']} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loading;
