import { FC, Fragment, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTypeRoutes } from '@/routes/routes';
import styles from './index.module.less';
import { useSelector } from '@/store';
import classNames from 'classnames';
import Iconfont from '../Iconfont';
import { Props } from './type';
import Menu from './menu';

const Header: FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const title = useSelector((s) => s.global.title);
    const [menuVisible, setMenuVisible] = useState(false);
    const { mapRoutes } = useMemo(() => getTypeRoutes(), []);
    const type = useMemo(() => mapRoutes[pathname]?.type, [pathname]);
    const showBack = useMemo(() => type === 'detail' || type === 'second', [type]);
    const showMenu = useMemo(() => type === 'home', [type]);
    const isError = useMemo(() => type === 'error' || !type, [type]);
    // const notNeedBoxShadow = ['设备', '报警'];

    const goBack = useCallback(() => {
        if (window.history.length > 0) navigate(-1);
    }, []);

    // 错误页不需要
    if (isError) return <Fragment>{children}</Fragment>;

    return (
        <Fragment>
            <div className={styles['wrapper']}>
                <div className={classNames(styles['header'], { [styles['box-shadow']]: true })}>
                    <div className={styles['left']}>
                        {showBack && <Iconfont icon="arrow-left-2" onClick={goBack} />}
                        {showMenu && <Iconfont icon="menu" onClick={() => setMenuVisible(true)} />}
                    </div>
                    <div className={styles['middle']}>{title}</div>
                    <div className={styles['right']} />
                </div>
                <div className={styles['content']}>{children}</div>
            </div>

            <Menu menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </Fragment>
    );
};

export default Header;
