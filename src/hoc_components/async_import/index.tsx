import React, { FC, useEffect, useState, ComponentType, useRef } from 'react'

// import的promise转为component
// promise to component
const asyncComponent = (promise: Promise<{default: ComponentType}>): FC => {
    const LoadComponent: FC = (props) => {
        const [Component, setComponent] = useState(<div />)

        useEffect(() => {
            promise.then((res) => {
                const { default: Component } = res
                setComponent(<Component {...props} />)
            })
        }, [])

        return Component
    }

    return LoadComponent
}

export default asyncComponent
