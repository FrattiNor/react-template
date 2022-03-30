import LazyLoad from '@/components/lazy-load'
import { requireLoad } from './utils'

// 总路由
const routes = [
    {
        path: '/',
        component: requireLoad(() => require('@/layouts/out-layout')), // 全局layout
        routes: [
            {
                path: '/403',
                title: '403 - 禁止访问',
                component: LazyLoad(() => import('@/pages/error/403'))
            },
            {
                path: '/404',
                title: '404 - 资源未找到',
                component: LazyLoad(() => import('@/pages/error/404'))
            },
            {
                path: '/500',
                title: '500 - 服务器错误',
                component: LazyLoad(() => import('@/pages/error/500'))
            },
            {
                path: '/login',
                title: '登录',
                component: LazyLoad(() => import('@/pages/login')),
                models: ['app']
            },
            {
                path: '/',
                component: requireLoad(() => require('@/layouts/basic-layout')), // 登录layout
                routes: [
                    {
                        path: '/',
                        redirect: '/home'
                    },
                    {
                        path: '/home',
                        title: '主页',
                        component: LazyLoad(() => import('@/pages/home'))
                    },
                    {
                        path: '/app',
                        title: 'app',
                        component: LazyLoad(() => import('@/pages/app'))
                    },
                    {
                        path: '/chart',
                        title: 'chart',
                        component: LazyLoad(() => import('@/pages/chart'))
                    },
                    {
                        path: '/canvas',
                        title: 'canvas',
                        component: LazyLoad(() => import('@/pages/canvas'))
                    }
                ]
            }
        ]
    }
]

export default routes
