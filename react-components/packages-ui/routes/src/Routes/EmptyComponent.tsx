import { Outlet } from 'react-router-dom';
import { FC } from 'react';

const EmptyComponent: FC = () => {
    return <Outlet />;
};

export default EmptyComponent;
