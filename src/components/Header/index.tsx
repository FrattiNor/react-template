import { FC, Fragment, useCallback, useMemo, useState } from 'react';
import useTypeRoutes from '@/routes/useTypeRoutes';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { useSelector } from '@/store';
import Iconfont from '../Iconfont';
import { Props } from './type';
import Menu from './menu';

const Header: FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const title = useSelector((s) => s.global.title);
    const [menuVisible, setMenuVisible] = useState(false);
    const { type, homeRoutes, secondRoutes, horizontalRoutes } = useTypeRoutes();
    const showMenu = useMemo(() => type === 'home' || type === 'second' || type === 'horizontal', [type]);

    const goBack = useCallback(() => {
        if (window.history.length > 0) navigate(-1);
    }, []);

    return (
        <Fragment>
            <div className={styles['wrapper']}>
                <div className={styles['header']}>
                    <div className={styles['left']}>
                        {!showMenu && <Iconfont icon="arrow-left-2" onClick={goBack} />}
                        {showMenu && <Iconfont icon="menu" onClick={() => setMenuVisible(true)} />}
                    </div>
                    <div className={styles['middle']}>{title}</div>
                    <div className={styles['right']} />
                </div>
                <div className={styles['content']}>{children}</div>
            </div>

            <Menu routes={[...homeRoutes, ...secondRoutes, ...horizontalRoutes]} menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </Fragment>
    );
};

export default Header;
