import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Route from './routes2';
import store from './store';
import 'amfe-flexible';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Route />
    </Provider>,
);
