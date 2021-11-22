import React, { FC } from 'react'
import ErrorTemplate from './error-template'

const Page500: FC = () => {
    return (
        <ErrorTemplate>
            <span>500</span>
        </ErrorTemplate>
    )
}

export default Page500
