import { lazy } from 'react';

import { AntdThemeProvider, Routes, ThemeProvider } from '@react/components';
import ReactDOM from 'react-dom/client';

import Layout1 from './Layout1';

import './index.module.less';

const route = (
    <Routes
        routes={[
            {
                type: 'Layout',
                path: '/',
                title: 'Layout1',
                Component: Layout1,
                children: [
                    {
                        type: 'Page1',
                        path: 'Page1?',
                        title: 'Page1',
                        children: [
                            {
                                type: 'Page1',
                                index: true,
                                Component: lazy(() => import('./Page1')),
                            },
                            {
                                type: 'Page1',
                                path: ':id',
                                title: 'Page1Detail',
                                Component: lazy(() => import('./Page1Detail')),
                            },
                        ],
                    },
                    {
                        type: 'Page2',
                        path: 'Page2',
                        title: 'Page2',
                        Component: lazy(() => import('./Page2')),
                    },
                ],
            },
            {
                type: 'Error',
                path: '403',
                title: '403',
                Component: () => '403',
            },
            {
                type: 'Error',
                path: '*',
                title: '404',
                Component: () => '404',
            },
        ]}
    />
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider container withBg>
        <AntdThemeProvider>{route}</AntdThemeProvider>
    </ThemeProvider>,
);
