import React, { FC, ChangeEvent } from 'react'
import classnames from 'classnames'
import styles from './index.less'

type props = {
    error?: string
    value?: string
    onChange?: (v: any) => void
}

const Form: FC<props> = ({ error, value, onChange }) => {
    
    const change = (e: ChangeEvent<HTMLInputElement>): void => {
        if (typeof onChange === 'function') {
            onChange(e.target.value)
        }
    }

    return <input value={value} onChange={change} className={classnames(styles['input'], { [styles['input-error']]: error })} />
}

export default Form
