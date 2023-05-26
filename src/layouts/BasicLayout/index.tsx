import KeepAlive2Provider from '@/components/KeepAlive2/Provider2';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import HistoryRecordProvider from './HistoryRecord/Provider';
import useTitle from './useTitle';

const BasicLayout = () => {
    useTitle();

    return (
        // 需要再react-redux和router下面
        <KeepAlive2Provider>
            <HistoryRecordProvider>
                <Outlet />
                <ScrollRestoration />
            </HistoryRecordProvider>
        </KeepAlive2Provider>
    );
};

export default BasicLayout;
