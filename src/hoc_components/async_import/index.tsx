import React, { FC, useState } from 'react'
import { isPromise } from '@/utils/judge'

// import的promise转为component
// promise_to_component
const asyncComponent = (promise: any): FC => {
    const LoadComponent: FC = (props) => {
        const [Component, setComponent]: any = useState(null)

        if (Component === null) {
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
        }

        return Component
    }

    return LoadComponent
}

export default asyncComponent