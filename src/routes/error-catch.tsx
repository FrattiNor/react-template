/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react'

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: any) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true }
    }
    componentDidCatch(error: any, errorInfo: any) {
        // 你同样可以将错误日志上报给服务器
        // logErrorToMyService(error, errorInfo)
    }
    render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return <h1>对不起，发生异常，请刷新页面重试</h1>
        }
        return this.props.children
    }
}

export default ErrorBoundary
