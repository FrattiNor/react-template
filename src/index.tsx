import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import dva from '@/utils/dva';
import { BrowserRouter } from 'react-router-dom';
import './index.less';

const app = dva();
const store = app._store;

ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>app</Provider>
    </BrowserRouter>,
    document.getElementById('root'),
);
