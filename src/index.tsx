/* eslint-disable react-refresh/only-export-components */
import './utils/initDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AliveScope } from 'react-activation';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Route from './routes';
import store from './store';
import 'amfe-flexible';
import './index.less';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools  initialIsOpen={false} /> */}
            <Provider store={store}>
                <AliveScope>
                    <Route />
                </AliveScope>
            </Provider>
        </QueryClientProvider>
    );
};

// https://github.com/CJY0208/react-activation/issues/225#issuecomment-1311136388
// react-activation 使用createRoot会导致一些问题
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
