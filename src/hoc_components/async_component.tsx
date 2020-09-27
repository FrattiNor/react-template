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
                        const { default: Component } = res
                        setComponent(<Component {...props} />)
                    })
                }
            } catch (e) {
                console.error(e)
            }
        }, [])

        return Component
    }

    return LoadComponent
}

export default asyncComponent
