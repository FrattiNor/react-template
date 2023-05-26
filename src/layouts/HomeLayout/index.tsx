import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getTypeRoutes } from '@/routes/routes';
import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import { TabBar } from 'antd-mobile';
import { FC, useMemo } from 'react';

const Bottom: FC = () => {
    const tabs = useMemo(() => {
        const { homeRoutes } = getTypeRoutes();
        return homeRoutes.map((item) => ({
            path: item.path,
            icon: item.icon as any,
            title: item.title,
        }));
    }, []);

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const setRouteActive = (value: string) => {
        console.log(value);
        navigate(value);
    };

    return (
        <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)} safeArea>
            {tabs.map((item) => (
                <TabBar.Item
                    key={item.path}
                    icon={<Iconfont icon={item.icon} />}
                    title={<div className={styles['tab-bar-text']}>{item.title}</div>}
                />
            ))}
        </TabBar>
    );
};

const HomeLayout = () => {
    return (
        <div className={styles['home']}>
            <div className={styles['content']}>
                <Outlet />
            </div>
            <div className={styles['foot']}>
                <Bottom />
            </div>
        </div>
    );
};

export default HomeLayout;
