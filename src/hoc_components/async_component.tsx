import React, { useEffect, useState } from 'react'
import { isPromise } from '@/utils/judge'

// import的promise转为component
// promise_to_component
const asyncComponent = (promise: any) => {
    const LoadComponent = (props: object) => {
        const [Component, setComponent]: any = useState(null)

        useEffect(() => {
            try {
                if (isPromise(promise)) {
                    promise.then((res: any) => {
                        setComponent(res)
                    })
                }
            } catch (e) {
                console.error(e)
            }
        }, [])

        return Component ? <Component.default {...props} /> : null
    }

    return LoadComponent
}

export default asyncComponent
