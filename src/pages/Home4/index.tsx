import { Link } from 'react-router-dom';
import { FC } from 'react';

const App: FC<{ a: number }> = () => {
    return (
        <div style={{ height: '110vh', padding: '10% 0 0 0' }}>
            home2
            <Link to="/home" preventScrollReset={true}>
                to home
            </Link>
            <Link to="/home2">to home2</Link>
        </div>
    );
};

export default App;
