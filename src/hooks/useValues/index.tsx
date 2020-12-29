import { useState } from 'react'

const useValues = (defaultValue: anyObject): [anyObject, (newV: anyObject) => void] => {
    const [v, setV] = useState(defaultValue)

    const changeV = (newV: anyObject): void => {

        const newObj = { ...v, ...newV }

        Object.entries(newObj).forEach(([key, value]) => {
            if(value === '') {
                delete newObj[key]
            }
        })

        setV(newObj)
    }

    return [v, changeV]
}

export default useValues
