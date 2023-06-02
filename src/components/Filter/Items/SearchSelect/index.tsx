import CustomFormItem from './CustomFormItem';
import { SearchSelectItem } from '../../type';
import Clear from '../_components/Clear';
import { Form } from 'antd-mobile';

function FilterSearchSelect<T>(props: SearchSelectItem<T>) {
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

export default FilterSearchSelect;
