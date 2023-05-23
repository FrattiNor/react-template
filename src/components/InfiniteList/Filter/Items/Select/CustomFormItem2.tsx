import { ReactNode, useState } from 'react';
import CustomSelect from './CustomSelect';
import { SelectItem } from '../../type';
import { Form } from 'antd-mobile';

function CustomFormItem<T>(props: SelectItem<T> & { arrow: boolean | ReactNode }) {
    const [visible, setVisible] = useState(false);
    const { name, label, option, placeholder = '请选择', arrow } = props;
    const query = typeof option === 'function' ? option() : null;
    const data = query?.data;
    const refetch = query?.refetch;
    const loading = query?.isFetching;
    const opt = Array.isArray(option) ? option : data || [];

    return (
        <Form.Item
            name={name}
            label={label}
            arrow={arrow}
            onClick={() => {
                if (refetch) refetch();
                setVisible(true);
            }}
        >
            <CustomSelect {...props} visible={visible} setVisible={setVisible} loading={loading} opt={opt} placeholder={placeholder} />
        </Form.Item>
    );
}

export default CustomFormItem;
