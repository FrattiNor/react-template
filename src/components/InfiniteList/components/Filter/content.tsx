import FilterBlockSelect from './Items/BlockSelect';
import FilterDatePicker from './Items/DatePicker';
import FilterRangPicker from './Items/RangPicker';
import { Button, Form } from 'antd-mobile';
import styles from './content.module.less';
import FilterSelect from './Items/Select';
import FilterInput from './Items/Input';
import { ContentProps } from './type';
import { FC, Fragment } from 'react';

const Content: FC<ContentProps> = ({ filterList }) => {
    const [form] = Form.useForm();

    const submit = () => {
        form.validateFields().then((v) => {
            console.log(v);
        });
    };

    const reset = () => {
        form.validateFields().then((v) => {
            console.log(v);
        });
    };

    return (
        <div className={styles['wrapper']}>
            <Form form={form} mode="card">
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

            <div className={styles['foot']}>
                <Button color="primary" size="large" fill="outline" onClick={reset}>
                    重 置
                </Button>
                <Button color="primary" size="large" onClick={submit}>
                    查 询
                </Button>
            </div>
        </div>
    );
};

export default Content;
