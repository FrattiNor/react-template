import { useContext2 } from '../../Context2';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const Loading: FC = () => {
    const { newProps } = useContext2();
    const { loading } = newProps;

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
