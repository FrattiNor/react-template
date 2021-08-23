import React, { FC } from 'react'
import styles from './index.less'

const One: FC = () => {
    console.log('aa')

    return (
        <>
            <div className={styles['wrapper']} style={{ overflow: 'hidden' }}>
                One（test）
            </div>
        </>
    )
}

export default One
