/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react'

const useEffectAfterFirst = (func: Function, depend: any[]): void => {
    const [first, setFirst] = useState(true)

    const trucFun = useCallback(() => func(), depend)

    useEffect(() => {
        if (first) {
            setFirst(!first)
        } else {
            trucFun()
        }
    }, depend)
}

export default useEffectAfterFirst
