import './utils/initDayjs';
import './utils/initFlexible';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Route from './routes';
import store from './store';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <Route />
        </Provider>
    </QueryClientProvider>,
);
