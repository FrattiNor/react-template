import React, { FC } from 'react'
import styles from './index.less'

type props = anyObject

const Form: FC<props> = ({ children, ...restProps }) => {
    return (
        <button className={styles['btn']} {...restProps}>
            {children}
        </button>
    )
}

export default Form
