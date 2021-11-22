import React, { FC } from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const ErrorTemplate: FC = ({ children }) => {
    const history = useHistory()

    return (
        <div
            style={{
                height: '80vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 100
            }}
        >
            {children}

            <Button type="primary" onClick={(): void => history.push('/')}>
                返回首页
            </Button>
        </div>
    )
}

export default ErrorTemplate
