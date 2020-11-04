import React, { FC, useEffect } from 'react'

type Props = {}

const BasicLayout: FC<Props> = ({ children }) => {
    useEffect(() => {
        console.log('basic')
    }, [])

    return <>{children}</>
}

export default BasicLayout
