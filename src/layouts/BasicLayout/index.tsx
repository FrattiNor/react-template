import KeepAlive2Provider from '@/components/KeepAlive2/Provider2';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import HistoryRecordProvider from './HistoryRecord/Provider';
import { useConstValue } from '@/services/global';
import Header from '@/components/Header';
import useTitle from './useTitle';

const BasicLayout = () => {
    useTitle();
    useConstValue();

    return (
        // 需要再react-redux和router下面
        <KeepAlive2Provider>
            <HistoryRecordProvider>
                <Header>
                    <Outlet />
                </Header>
                <ScrollRestoration />
            </HistoryRecordProvider>
        </KeepAlive2Provider>
    );
};

export default BasicLayout;
