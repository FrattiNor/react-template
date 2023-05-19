import CustomSelect from './CustomSelect';
import { SelectItem } from '../../type';
import { useState } from 'react';
import { Form } from 'antd-mobile';

function FilterSelect<T>(props: SelectItem<T>) {
    const { name, label, option, placeholder = '请选择' } = props;
    const [visible, setVisible] = useState(false);
    const query = typeof option === 'function' ? option() : null;
    const data = query?.data;
    const refetch = query?.refetch;
    const loading = query?.isFetching;
    const opt = Array.isArray(option) ? option : data || [];

    return (
        <Form.Item
            name={name}
            label={label}
            onClick={() => {
                if (refetch) refetch();
                setVisible(true);
            }}
        >
            <CustomSelect {...props} visible={visible} setVisible={setVisible} loading={loading} opt={opt} placeholder={placeholder} />
        </Form.Item>
    );
}

export default FilterSelect;
