import { hot } from 'react-hot-loader/root'
import React, { FC } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import Routes from '@/routes'
import dva from '@/utils/dva'
import './index.less'

const app = dva()
const store = app.getStore()

const Entry: FC = hot(() => {
    return (
        <Provider store={store}>
            <Routes app={app} />
        </Provider>
    )
})

ReactDom.render(<Entry />, document.getElementById('root'))
