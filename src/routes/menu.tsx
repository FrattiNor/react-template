import LazyLoad from '@/components/lazy_load'

// 总路由
const routes = [
    {
        path: '/',
        component: require('@/layouts/out_layout'),
        routes: [
            {
                path: '/',
                component: require('@/layouts/basic_layout'),
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
                        component: require('@/pages/two'),
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
