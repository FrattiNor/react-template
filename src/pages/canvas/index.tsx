import React from 'react'
import Planet from './planet'
import Picture from './picture'
import Clock from './clock'
import styles from './index.less'

const Canvas = () => {
    return (
        <div className={styles['wrapper']}>
            <Planet />
            <Picture />
            <Clock />
        </div>
    )
}

export default Canvas
