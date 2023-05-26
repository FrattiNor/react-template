import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

const SecondLayout = () => {
    return (
        <Header right="back">
            <Outlet />
        </Header>
    );
};

export default SecondLayout;
