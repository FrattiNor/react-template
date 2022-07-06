import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Route from './route';
import store from './store';
import './index.less';

ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
);
