import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

const DetailLayout = () => {
    return (
        <Header right="back">
            <Outlet />
        </Header>
    );
};

export default DetailLayout;
