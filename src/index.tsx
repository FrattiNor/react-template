import './utils/initDayjs';
import KeepAliveProvider from './components/KeepAlive/KeepAliveProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Route from './routes';
import store from './store';
import 'amfe-flexible';
import './index.less';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools  initialIsOpen={false} /> */}
        <Provider store={store}>
            <KeepAliveProvider>
                <Route />
            </KeepAliveProvider>
        </Provider>
    </QueryClientProvider>,
);
