import React, { FC } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './index.less'
import { useHistory } from 'react-router-dom'

const Login: FC = () => {
    const history = useHistory()

    const onFinish = (values: any): void => {
        console.log('values', values)
        history.push('/home')
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
        </div>
    )
}

export default Login
