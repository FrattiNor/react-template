import React, { FC, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'

// 基础的layout，负责构建基本框架
const BasicLayout: FC = ({ children }) => {
    const match = useRouteMatch('/one')

    useEffect(() => {
        console.log('basic', children)
    }, [children])

    return (
        <>
            {children}
            {match && <div>yes</div>}
        </>
    )
}

export default BasicLayout
