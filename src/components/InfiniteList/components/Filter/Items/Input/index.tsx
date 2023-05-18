import { Input, Form } from 'antd-mobile';
import { InputItem } from '../../type';
import { FC } from 'react';

const FilterInput: FC<InputItem> = ({ name, label, placeholder = '请输入' }) => {
    return (
        <Form.Item name={name} label={label}>
            <Input placeholder={placeholder} />
        </Form.Item>
    );
};

export default FilterInput;
