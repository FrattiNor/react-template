import React, { FC, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

const Login: FC = () => {
    const [a, setA] = useState(1)
    const [b, setB] = useState(1)
    console.log(a, b)
    const history = useHistory()

    const onFinish = (values: any): void => {
        console.log('values', values)
        history.push('/home')
    }

    const onClick = () => {
        setA(a + 1)
        setA(a + 1)
    }

    const onClick2 = () => {
        Promise.resolve().then(() => {
            setA(a + 1)
            setA(a + 1)
        })
    }

    return (
        <div className={styles['login-wrapper']}>
            <div className={styles['login-card']}>
                <div className={styles['login-title']}>LOGO</div>
                <Form onFinish={onFinish} autoComplete="off">
                    <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        登录
                    </Button>
                </Form>
            </div>
            <Button type="primary" onClick={onClick2}>
                Promise
            </Button>
            <Button type="primary" onClick={onClick}>
                notPromise
            </Button>
        </div>
    )
}

export default Login
