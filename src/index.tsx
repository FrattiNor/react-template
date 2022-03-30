import React, { FC } from 'react'
import ReactDom from 'react-dom'
// import { Provider } from 'react-redux'
// import dva from '@/utils/dva'
import { BrowserRouter } from 'react-router-dom'

// const App: FC = () => {
//     const app = dva()
//     const store = app._store

//     return <Provider store={store}>app</Provider>
// }

const App: FC = () => {
    return <>app</>
}

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)
