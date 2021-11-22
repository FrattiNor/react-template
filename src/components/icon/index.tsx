import React, { FC, CSSProperties } from 'react'
import classnames from 'classnames'
import styles from './index.less'
import './iconfont'

type iconProps = {
    name: string
    size?: number
    color?: string
    style?: CSSProperties
    className?: string
}

const Icon: FC<iconProps> = ({ name, size, color, style = {}, className = '' }) => {
    return (
        <svg className={classnames(styles['cool-icon'], className)} style={{ fontSize: size, color, ...style }} aria-hidden="true">
            <use xlinkHref={`#icon-${name}`} />
        </svg>
    )
}

export default Icon
