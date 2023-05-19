import { cleanParams, isEmptyParam } from '@/utils/params';
import FilterBlockSelect from './Items/BlockSelect';
import FilterDatePicker from './Items/DatePicker';
import FilterRangPicker from './Items/RangPicker';
import { FC, Fragment, useMemo } from 'react';
import { Button, Form } from 'antd-mobile';
import styles from './content.module.less';
import FilterSelect from './Items/Select';
import FilterInput from './Items/Input';
import { ContentProps } from './type';

const Content: FC<ContentProps> = ({ params, addAndDelParams, filterList }) => {
    const [form] = Form.useForm();

    const filterKeys = useMemo(
        () => filterList.reduce((a, { name }) => [...a, ...(Array.isArray(name) ? name : [name])], [] as string[]),
        [filterList],
    );

    const submit = () => {
        form.validateFields().then((v) => {
            const del: string[] = [];
            filterKeys.forEach((key) => {
                if (isEmptyParam(v[key])) del.push(key);
            });
            addAndDelParams({ add: cleanParams(v), del });
        });
    };

    const reset = () => {
        addAndDelParams({ del: filterKeys });
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['form-container']}>
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
