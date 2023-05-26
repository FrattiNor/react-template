import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useTypeRoutes from '@/routes/useTypeRoutes';
import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import { TabBar } from 'antd-mobile';
import { FC, useMemo } from 'react';

const Bottom: FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { homeRoutes } = useTypeRoutes();

    const tabs = useMemo(() => {
        return homeRoutes.map((item) => ({
            path: item.path,
            icon: item.icon as any,
            title: item.title,
        }));
    }, [homeRoutes]);

    const setRouteActive = (value: string) => {
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
