import styles from './index.module.less';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';
import { FC } from 'react';

type Props = {
    loading?: boolean;
};

const Loading: FC<Props> = ({ loading }) => {
    const { theme } = useTheme();

    return (
        <div className={classNames(styles['loading-wrapper'], styles[theme], { [styles['active']]: loading === true })}>
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
