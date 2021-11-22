import React, { FC } from 'react'
import Transition from '@/components/transition'

// 基础的layout，负责构建基本框架
const BasicLayout: FC = ({ children }) => {
    return (
        <div style={{ padding: 24 }}>
            <Transition>{children}</Transition>
        </div>
    )
}

export default BasicLayout
