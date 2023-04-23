import type { FC, PropsWithChildren } from 'react';

import styles from './index.less';

type Props = PropsWithChildren<{
    title?: string;
}>;

const Title: FC<Props> = ({ title, children }) => {
    const text = typeof title === 'string' ? title : typeof children === 'string' ? children : '';

    return (
        <div className={styles['title']}>
            <span className={styles['inner']}>{text}</span>
        </div>
    );
};

export default Title;
