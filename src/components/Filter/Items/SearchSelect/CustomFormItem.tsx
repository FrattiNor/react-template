import { SearchSelectItem } from '../../type';
import { ReactNode, useState } from 'react';
import CustomSelect from './CustomSelect';
import { Form } from 'antd-mobile';

function CustomFormItem<T>(props: SearchSelectItem<T> & { arrow: boolean | ReactNode }) {
    const [visible, setVisible] = useState(false);
    const { name, label, arrow } = props;

    return (
        <Form.Item name={name} label={label} arrow={arrow} onClick={() => setVisible(true)}>
            <CustomSelect {...props} visible={visible} setVisible={setVisible} />
        </Form.Item>
    );
}

export default CustomFormItem;
