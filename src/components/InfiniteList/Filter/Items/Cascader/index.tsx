import CustomFormItem from './CustomFormItem';
import { CascaderItem } from '../../type';
import Clear from '../_components/Clear';
import { Form } from 'antd-mobile';

function FilterCascader<T>(props: CascaderItem<T>) {
    const { name } = props;

    console.log(name);

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

export default FilterCascader;
