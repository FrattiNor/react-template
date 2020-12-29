import React, { FC } from 'react'
import Button from '@/UI'

const One: FC = () => {
    console.log('Button', Button)

    return (
        <div style={{ overflow: 'hidden' }}>
            <div style={{ width: 250, margin: 10 }}>
                <Button>submit</Button>
            </div>
        </div>
    )
}

export default One
