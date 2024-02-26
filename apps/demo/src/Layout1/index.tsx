import { Outlet } from 'react-router-dom';

// import { useDocumentTitle, useRoutesByType } from '@react/components';

const Layout1 = () => {
    // useDocumentTitle();
    // useRoutesByType();

    return (
        <div>
            Layout1
            <Outlet />
        </div>
    );
};

export default Layout1;
