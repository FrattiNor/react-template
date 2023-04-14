import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Route from './route';
import './index.less';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Route />
    </BrowserRouter>,
);
