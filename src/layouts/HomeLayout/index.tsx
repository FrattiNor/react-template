import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import { TabBar } from 'antd-mobile';
import { FC } from 'react';

const Bottom: FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const setRouteActive = (value: string) => {
        navigate(value);
    };

    const tabs = [
        {
            key: '/',
            icon: <Iconfont icon="device" />,
            title: <span className={styles['tab-bar-text']}>{`设备`}</span>,
        },
        {
            key: '/home/alarm',
            icon: <Iconfont icon="alarm" />,
            title: <span className={styles['tab-bar-text']}>{`报警`}</span>,
        },
        {
            key: '/home/knowledge',
            icon: <Iconfont icon="knowledge" />,
            title: <span className={styles['tab-bar-text']}>{`知识库`}</span>,
        },
    ];

    return (
        <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
            {tabs.map((item) => (
                <TabBar.Item key={item.key} title={item.title} icon={item.icon} />
            ))}
        </TabBar>
    );
};

const HomeLayout = () => {
    return (
        <div className={styles['home']}>
            <div className={styles['bottom']}>
                <Bottom />
            </div>
            <div className={styles['content']}>
                <Outlet />
            </div>
            <div className={styles['bottom']}>
                <Bottom />
            </div>
        </div>
    );
};

export default HomeLayout;
