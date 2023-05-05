import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Route from './route';
import store from './store';
import './index.less';

const App = () => {
    return (
        <Provider store={store}>
            <Route />
        </Provider>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
