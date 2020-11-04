import React, { FC, useEffect } from 'react'

// 基础的layout，负责构建基本框架
const BasicLayout: FC = ({ children }) => {
    useEffect(() => {
        console.log('basic')
    }, [])

    return <>{children}</>
}

export default BasicLayout
