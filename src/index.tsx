import React, { FC } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import RenderRoute from '@/routes/render-route'
import routeMenu from '@/routes/menu'
import dva from '@/utils/dva'
import { BrowserRouter, useHistory } from 'react-router-dom'
import './index.less'

const App: FC = () => {
    const history = useHistory()
    const app = dva(history)
    const store = app.getStore()

    return (
        <Provider store={store}>
            <RenderRoute menu={routeMenu} />
        </Provider>
    )
}

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)
