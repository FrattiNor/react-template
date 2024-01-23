import { useDocumentTitle, useRoutesByType } from '@react/components';
import { Outlet } from 'react-router-dom';

const Layout1 = () => {
    useDocumentTitle();
    useRoutesByType();

    return (
        <div>
            Layout1
            <Outlet />
        </div>
    );
};

export default Layout1;
