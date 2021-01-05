import React, { FC } from 'react'
import styles from './index.less'

const One: FC = () => {
    return (
        <>
            <div className={styles['wrapper']} style={{ overflow: 'hidden' }}>
                One
            </div>
        </>
    )
}

export default One
