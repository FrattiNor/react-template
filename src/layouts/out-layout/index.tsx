import React, { FC } from 'react'
import styles from './index.less'

// 最外部的layout，负责获取全局的一些数据
const OutLayout: FC = ({ children }) => {
    return <div className={styles['out-layout']}>{children}</div>
}

export default OutLayout
