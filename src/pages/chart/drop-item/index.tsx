import React, { FC, Fragment, useRef, useState } from 'react'
import element from '../canvas-items'
import styles from './index.less'

const DropItem: FC<{ name: string; x: number; y: number }> = ({ name, x, y }) => {
    const C = element.find((item) => item.name === name)?.Component
    const ref = useRef<HTMLDivElement | null>(null)
    const [height, setHeight] = useState(100)
    const [width, setWidth] = useState(100)

    return C ? (
        <div ref={ref} className={styles['drop-item']} style={{ top: y, left: x, width: width, height: height }}>
            <C width={width} height={height} />
            <div className={styles['part-1']} />
            <div className={styles['part-2']} />
            <div className={styles['part-3']} />
            <div className={styles['part-4']} />
            <div className={styles['line-1']} />
            <div className={styles['line-2']} />
            <div className={styles['line-3']} />
            <div className={styles['line-4']} />
        </div>
    ) : (
        <Fragment />
    )
}

export default DropItem
