import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const EmptyComponent: FC = () => {
    return <Outlet />;
};

export default EmptyComponent;
