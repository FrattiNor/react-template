import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './pages/testApp';
import Route from './route';
import './index.less';

const isTest = 0;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    isTest ? (
        <App />
    ) : (
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    ),
);
