import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import Routes from '@/routes'
import dva from '@/utils/dva'
import './index.less'

const app = dva()
const store = app.getStore()

ReactDom.render(
    <Provider store={store}>
        <Routes app={app} />
    </Provider>,
    document.getElementById('root')
)
