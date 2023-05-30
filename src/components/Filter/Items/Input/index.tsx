import { Input, Form } from 'antd-mobile';
import Clear from '../_components/Clear';
import { InputItem } from '../../type';
import { FC } from 'react';

// subscribeName 和 clear 兼容 Array形式
type Props = InputItem & {
    subscribeName?: string[];
    clear?: () => void;
    arrow?: JSX.Element;
};

const FilterInput: FC<Props> = ({ name, label, placeholder = '请输入', arrow: _arrow, subscribeName: _subscribeName }) => {
    const subscribeName = _subscribeName || name;

    return (
        <Form.Subscribe to={[subscribeName]}>
            {(_, form) => {
                const currentValue = form.getFieldValue(subscribeName);
                const clear = () => form.setFieldValue(subscribeName, '');
                const arrow = _arrow || (currentValue ? <Clear clear={clear} /> : false);

                return (
                    <Form.Item name={name} label={label} arrow={arrow}>
                        <Input placeholder={placeholder} />
                    </Form.Item>
                );
            }}
        </Form.Subscribe>
    );
};

export default FilterInput;
