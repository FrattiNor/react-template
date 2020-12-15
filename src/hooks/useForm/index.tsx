import { useEffect, useState } from 'react'

const useForm = (): Form => {
    const submitForm = () => {
        console.log('no this function')
    }
    const [form, setForm]: [anyObject, Function] = useState({})
    const [res, setRes] = useState({ ...form, submitForm, setForm })

    useEffect(() => {
        setRes({
            ...res,
            ...form,
        })
    }, [form])

    return res
}

export default useForm
