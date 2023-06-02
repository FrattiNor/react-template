import useRenderArray from './Items/_hooks/useRenderArray';
import FilterSearchSelect from './Items/SearchSelect';
import FilterBlockSelect from './Items/BlockSelect';
import FilterDatePicker from './Items/DatePicker';
import FilterRangPicker from './Items/RangPicker';
import { FC, Fragment, useMemo } from 'react';
import FilterCascader from './Items/Cascader';
import { cleanParams } from '@/utils/params';
import { Button, Form } from 'antd-mobile';
import styles from './content.module.less';
import FilterSelect from './Items/Select';
import FilterInput from './Items/Input';
import { isEmpty } from '@/utils/tools';
import { ContentProps } from './type';

const Content: FC<ContentProps> = ({ params, filterList, setVisible, addAndDelParams }) => {
    const [form] = Form.useForm();
    const { renderArray } = useRenderArray();

    const filterKeys = useMemo(
        () => filterList.reduce((a, { name }) => [...a, ...(Array.isArray(name) ? name : [name])], [] as string[]),
        [filterList],
    );

    const submit = () => {
        form.validateFields().then((v) => {
            const del: string[] = [];
            filterKeys.forEach((key) => {
                if (isEmpty(v[key])) del.push(key);
            });
            addAndDelParams({ add: cleanParams(v), del });
            setVisible(false);
        });
    };

    const reset = () => {
        addAndDelParams({ del: filterKeys });
        setVisible(false);
    };

    return (
        <div className={styles['wrapper']}>
            <Form form={form} className={styles['form']} mode="card" initialValues={params}>
                {filterList.map((item, i) => {
                    let res = <Fragment />;
                    switch (item.type) {
                        case 'input':
                            // 如果是array直接返回
                            if (item.array) return <Fragment key={i}>{renderArray(item.name, item.label, FilterInput, item)}</Fragment>;
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
                        case 'cascader':
                            res = <FilterCascader {...item} />;
                            break;
                        case 'search-select':
                            res = <FilterSearchSelect {...item} />;
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
