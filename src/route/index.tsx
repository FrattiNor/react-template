import { Route, Routes } from 'react-router-dom';
import App from '@/pages/editor';

const RouteFC = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
        </Routes>
    );
};

export default RouteFC;
