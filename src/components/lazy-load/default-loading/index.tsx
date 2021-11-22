import React, { FC } from 'react'
import { Card, Skeleton } from 'antd'

const Loading: FC = () => {
    return (
        <Card>
            <Skeleton />
        </Card>
    )
}

export default Loading
