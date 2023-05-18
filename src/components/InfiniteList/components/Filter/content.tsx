import FilterBlockSelect from './Items/BlockSelect';
import FilterDatePicker from './Items/DatePicker';
import FilterRangPicker from './Items/RangPicker';
import { Button, Form } from 'antd-mobile';
import styles from './content.module.less';
import FilterSelect from './Items/Select';
import FilterInput from './Items/Input';
import { ContentProps } from './type';
import { FC, Fragment } from 'react';
import { Provider } from './context';

const Content: FC<ContentProps> = ({ params, setParams, filterList }) => {
    const [form] = Form.useForm();

    const submit = () => {
        form.validateFields().then((v) => {
            console.log(v);
            setParams(v);
        });
    };

    const reset = () => {
        form.validateFields().then((v) => {
            console.log(v);
            setParams({});
        });
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['form-container']}>
                <Provider form={form}>
                    <Form form={form} className={styles['form']} mode="card" initialValues={params}>
                        {filterList.map((item, i) => {
                            let res = <Fragment />;
                            switch (item.type) {
                                case 'input':
                                    res = <FilterInput {...item} />;
                                    break;
                                case 'select':
                                    res = <FilterSelect {...item} />;
                                    break;
                                case 'block-select':
                                    res = <FilterBlockSelect {...item} />;
                                    break;
                                case 'date-picker':
                                    res = <FilterDatePicker {...item} />;
                                    break;
                                case 'rang-picker':
                                    res = <FilterRangPicker {...item} />;
                                    break;
                                default:
                                    res = <Fragment />;
                                    break;
                            }
                            return (
                                <Fragment key={i}>
                                    {res}
                                    <Form.Header />
                                </Fragment>
                            );
                        })}
                    </Form>
                </Provider>
            </div>

            <div className={styles['foot']}>
                <Button color="primary" fill="outline" onClick={reset}>
                    重 置
                </Button>
                <Button color="primary" onClick={submit}>
                    查 询
                </Button>
            </div>
        </div>
    );
};

export default Content;
