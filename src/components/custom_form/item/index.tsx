import React, { FC, ReactElement, cloneElement, isValidElement } from 'react'
import useEffectAfterFirst from '@/hooks/useEffectAfterFirst'
import styles from './index.less'

type rule = {
    pattern: RegExp
    message: string
}

type props = {
    children: ReactElement
    name: string
    label: string
    labelWidth?: number
    help?: string
    rules?: rule[]

    value?: string
    setValue?: Function
    error?: string
    setError?: Function
}

const Item: FC<props> = ({ children, label, labelWidth, help, value, setValue, error, setError, rules }) => {
    const helpText = error || help

    const itemStyle = {
        marginBottom: helpText ? 0 : 24
    }

    const labelStyle = {
        width: labelWidth
    }

    const helpStyle = {
        marginLeft: labelWidth,
        color: error ? '#ff4d4f' : '#000'
    }

    useEffectAfterFirst(() => {
        if (typeof value === 'string' && typeof setError === 'function') {
            const rulesJundge = rules?.some(({ pattern, message }): boolean | void => {
                if (!pattern.test(value)) {
                    setError(message)
                    return true
                }
            })

            if (!rulesJundge) {
                setError('')
            }
        }
    }, [value, rules])

    const input = isValidElement(children) ? cloneElement(children, { ...children.props, error, value, onChange: setValue }) : null

    return (
        <div className={styles['item']} style={itemStyle}>
            <div className={styles['label-input']}>
                <div className={styles['label']} style={labelStyle}>
                    {label}:
                </div>
                <div className={styles['input']}>{input}</div>
            </div>
            {helpText && (
                <div className={styles['help']} style={helpStyle}>
                    {helpText}
                </div>
            )}
        </div>
    )
}

export default Item
