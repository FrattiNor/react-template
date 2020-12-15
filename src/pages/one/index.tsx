import React, { FC } from 'react'
import { Form, Item, Input, Button, useForm } from '@/components/custom_form'
// import styles from './index.less'

const One: FC = () => {
    const form = useForm()
    const { submitForm } = form

    const onSubmit = (values): void => {
        console.log(values)
    }

    const onError = (errors): void => {
        console.log(errors)
    }



    return (
        <div style={{ overflow: 'hidden' }}>
            <div style={{ width: 250, margin: 10 }}>
                <Form labelWidth={80} form={form} onSubmit={onSubmit} onError={onError}>
                    <Item name="username" label="用户名" rules={[{ pattern: /^.+$/, message: '请输入用户名' }]}>
                        <Input />
                    </Item>
                    <Item name="password" label="密码" rules={[{ pattern: /^.+$/, message: '请输入密码' }]}>
                        <Input />
                    </Item>
                </Form>
                <Button onClick={submitForm}>submit</Button>
            </div>
        </div>
    )
}

export default One
