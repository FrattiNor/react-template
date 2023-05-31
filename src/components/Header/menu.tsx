import { useNavigate } from 'react-router-dom';
import styles from './menu.module.less';
import { Popup } from 'antd-mobile';
import { MenuProps } from './type';
import Iconfont from '../Iconfont';
import { FC } from 'react';

const Menu: FC<MenuProps> = ({ menuVisible, setMenuVisible, routes }) => {
    const navigate = useNavigate();

    const itemClick = (key: string) => {
        setMenuVisible(false);
        navigate(key);
    };

    return (
        <Popup position="left" destroyOnClose visible={menuVisible} onMaskClick={() => setMenuVisible(false)}>
            <div className={styles['wrapper']}>
                <div className={styles['title']}>导航</div>
                <div className={styles['content']}>
                    {routes.map(({ path, icon, title }) => (
                        <div key={path} className={styles['item']} onClick={() => itemClick(path)}>
                            <span className={styles['icon']}>
                                <Iconfont icon={icon as any} />
                            </span>
                            <span className={styles['text']}>{title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Popup>
    );
};

export default Menu;
