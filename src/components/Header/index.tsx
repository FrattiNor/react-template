import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { useSelector } from '@/store';
import classNames from 'classnames';
import Iconfont from '../Iconfont';
import { Props } from './type';
import { FC } from 'react';

const Header: FC<Props> = ({ children, boxShadow = true, back }) => {
    const navigate = useNavigate();
    const title = useSelector((s) => s.global.title);
    const goBack = () => {
        if (window.history.length > 0) navigate(-1);
    };

    return (
        <div className={styles['wrapper']}>
            <div className={classNames(styles['header'], { [styles['box-shadow']]: boxShadow })}>
                <div className={styles['left']}>{back && <Iconfont icon="arrow-left-2" onClick={goBack} />}</div>
                <div className={styles['middle']}>{title}</div>
                <div className={styles['right']} />
            </div>
            <div className={styles['content']}>{children}</div>
        </div>
    );
};

export default Header;
