/* eslint-disable indent */
import React, { FC, cloneElement, ReactElement, isValidElement, useEffect, useMemo } from 'react'
import useValues from '@/hooks/useValues'
import useForm from '@/hooks/useForm'
import styles from './index.less'

type props = {
    children: ReactElement[]
    labelWidth?: number
    form?: Form
    onSubmit?: (values: anyObject) => void
    onError?: (errors: anyObject) => void
}

const Form: FC<props> = ({ children, labelWidth, form, onSubmit, onError }) => {
    const [values, setValues] = useValues({})
    const [errors, setErrors] = useValues({})

    const getValue = (name: string): string => {
        return values[name] || ''
    }

    const getError = (name: string): string => {
        return errors[name] || ''
    }

    const setValue = (name: string): Function => {
        return (v: string): void => {
            setValues({ [name]: v })
        }
    }

    const setError = (name: string): Function => {
        return (v: string): void => {
            setErrors({ [name]: v })
        }
    }

    const list: ReactElement[] = Array.isArray(children)
        ? children.filter((item) => isValidElement(item))
        : isValidElement(children)
        ? [children]
        : []

    const defaultForm = useForm()
    const trueForm = form || defaultForm
    const { setForm } = trueForm

    const submitForm = (): void => {
        if (Object.keys(errors).length > 0) {
            if (typeof onError === 'function') {
                onError(errors)
            }
        } else {
            if (typeof onSubmit === 'function') {
                onSubmit(values)
            }
        }
    }

    useEffect(() => {
        setForm({ submitForm })
    }, [errors])

    const dom = list.map((child, i) =>
        cloneElement(child, {
            labelWidth,
            key: i,
            ...child.props,
            value: getValue(child.props.name),
            setValue: setValue(child.props.name),
            error: getError(child.props.name),
            setError: setError(child.props.name)
        })
    )

    return useMemo(() => <form className={styles['form']}>{dom}</form>, [values, errors])
}

export default Form
