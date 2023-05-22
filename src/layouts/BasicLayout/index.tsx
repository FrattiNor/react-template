import { Outlet, ScrollRestoration } from 'react-router-dom';
import HistoryRecordProvider from './HistoryRecord/Provider';
import useTitle from './useTitle';

const BasicLayout = () => {
    useTitle();

    return (
        <HistoryRecordProvider>
            <Outlet />
            <ScrollRestoration />
        </HistoryRecordProvider>
    );
};

export default BasicLayout;
