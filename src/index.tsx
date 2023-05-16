import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import 'antd-mobile/es/global';
import Route from './routes';
import store from './store';
import 'amfe-flexible';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Route />
        </Provider>
    </QueryClientProvider>,
);
