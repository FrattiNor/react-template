import React, { FC, useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import styles from './index.less'

const DropDown: FC = ({ children }) => {
    const [visible, setVisible] = useState(false)
    const [animate, setAnimate] = useState(false)
    const Timeout1 = useRef(0)
    const Timeout2 = useRef(0)

    const clearTimeoutFun = () => {
        clearTimeout(Timeout1.current)
        clearTimeout(Timeout2.current)
    }

    const mouseEnter = () => {
        clearTimeoutFun()
        setAnimate(true)
        Timeout1.current = window.setTimeout(() => {
            setVisible(true)
        }, 170)
    }

    const mouseLeave = () => {
        clearTimeoutFun()
        setAnimate(false)
        Timeout2.current = window.setTimeout(() => {
            setVisible(false)
        }, 170)
    }

    useEffect(() => {
        return () => {
            clearTimeoutFun()
        }
    }, [])

    const menu = (
        <div className={classnames(styles['menu-out'], { [styles['show']]: visible, [styles['in']]: animate, [styles['out']]: !animate })}>
            <div className={styles['menu']}>
                <div className={styles['menu-item']}>item1</div>
                <div className={styles['menu-item']}>item2</div>
            </div>
        </div>
    )

    return (
        <div className={styles['wrapper']} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            {children}
            {menu}
        </div>
    )
}

export default DropDown
