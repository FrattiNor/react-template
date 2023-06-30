
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Routes from './routes';
import './index.module.less';
import 'antd/dist/reset.css';
import store from './store';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   
      
           
                <Provider store={store}>
                    <Routes />
                </Provider>
         
      
);
