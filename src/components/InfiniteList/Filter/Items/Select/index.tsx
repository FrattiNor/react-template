import CustomFormItem from './CustomFormItem2';
import Clear from '../_components/Clear';
import { SelectItem } from '../../type';
import { Form } from 'antd-mobile';

function FilterSelect<T>(props: SelectItem<T>) {
    const { name } = props;

    return (
        <Form.Subscribe to={[name]}>
            {(subscribeValue, form) => {
                const currentValue = subscribeValue[name];
                const clear = () => form.setFieldValue(name, []);
                const haveValue = Array.isArray(currentValue) && currentValue.length > 0;
                const arrow = haveValue ? <Clear clear={clear} /> : true;

                return <CustomFormItem {...props} arrow={arrow} />;
            }}
        </Form.Subscribe>
    );
}

export default FilterSelect;
