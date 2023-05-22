import styles from './index.module.less';
import { useSelector } from '@/store';
import { Props } from './type';
import { FC } from 'react';
import classNames from 'classnames';

const Header: FC<Props> = ({ children, boxShadow = true }) => {
    const title = useSelector((s) => s.global.title);

    return (
        <div className={styles['wrapper']}>
            <div className={classNames(styles['header'], { [styles['box-shadow']]: boxShadow })}>
                <div>{title}</div>
            </div>
            <div className={styles['content']}>{children}</div>
        </div>
    );
};

export default Header;
