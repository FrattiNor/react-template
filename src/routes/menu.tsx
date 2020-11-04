import LazyLoad from '@/components/lazy_load'

// 总路由
const routes = [
    {
        path: '/',
        component: LazyLoad(() => import('@/layouts/out_layout'), 'react'), 
        routes: [
            {
                path: '/',
                component: LazyLoad(() => import('@/layouts/basic_layout'), 'react'), 
                routes: [
                    {
                        path: '/',
                        redirect: '/one'
                    },
                    {
                        path: '/one',
                        title: '页面 - 1',
                        component: LazyLoad(() => import('@/pages/one'), 'react'),
                    },
                    {
                        path: '/two',
                        title: '页面 - 2',
                        component: LazyLoad(() => import('@/pages/two'), 'react'),
                    }
                    // {
                    //     path: '/403',
                    //     title: '403 - 禁止访问',
                    //     component: import('@/pages/error/403')
                    // },
                    // {
                    //     path: '/404',
                    //     title: '404 - 资源未找到',
                    //     component: import('@/pages/error/404')
                    // },
                    // {
                    //     path: '/500',
                    //     title: '500 - 服务器错误',
                    //     component: import('@/pages/error/500')
                    // },
                    // {
                    //     redirect: '/404'
                    // }
                ]
            }
        ]
    }
]

export default routes
