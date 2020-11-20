// 总路由
const routes = [
    {
        path: '/',
        component: import('@/layouts/out_layout'),
        routes: [
            {
                path: '/',
                component: import('@/layouts/basic_layout'),
                routes: [
                    {
                        path: '/',
                        redirect: '/one'
                    },
                    {
                        path: '/one',
                        title: '页面 - 1',
                        component: import('@/pages/one')
                    },
                    {
                        path: '/two',
                        title: '页面 - 2',
                        component: import('@/pages/two')
                    }
                ]
            }
        ]
    }
]

export default routes
