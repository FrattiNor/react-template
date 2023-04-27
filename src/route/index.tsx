import { Route, Routes } from 'react-router-dom';
import App from '@/pages/app';

const RouteFC = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
        </Routes>
    );
};

export default RouteFC;
