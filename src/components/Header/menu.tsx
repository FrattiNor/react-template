import { getTypeRoutes } from '@/routes/routes';
import { useNavigate } from 'react-router-dom';
import styles from './menu.module.less';
import { Popup } from 'antd-mobile';
import { FC, useMemo } from 'react';
import { MenuProps } from './type';

const Menu: FC<MenuProps> = ({ menuVisible, setMenuVisible }) => {
    const navigate = useNavigate();
    const { homeRoutes, secondRoutes } = useMemo(() => getTypeRoutes(), []);

    const itemClick = (key: string) => {
        setMenuVisible(false);
        navigate(key);
    };

    return (
        <Popup position="left" destroyOnClose visible={menuVisible} onMaskClick={() => setMenuVisible(false)}>
            <div className={styles['wrapper']}>
                <div className={styles['title']}>导航</div>
                <div className={styles['content']}>
                    {[...homeRoutes, ...secondRoutes].map(({ path, icon, title }) => (
                        <div key={path} className={styles['item']} onClick={() => itemClick(path)}>
                            <span className={styles['icon']}>{icon}</span>
                            <span className={styles['text']}> {title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Popup>
    );
};

export default Menu;
