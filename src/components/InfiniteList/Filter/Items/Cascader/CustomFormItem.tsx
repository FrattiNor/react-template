import { Cascader, Form } from 'antd-mobile';
import { CascaderItem } from '../../type';
import { ReactNode, useMemo } from 'react';

type fieldKeysOptItem = {
    label: string;
    value: string;
    children?: fieldKeysOptItem[];
};

function CustomFormItem<T>(props: CascaderItem<T> & { arrow: boolean | ReactNode }) {
    const { name, label, option, placeholder = '请选择', fieldKeys, arrow } = props;
    const query = typeof option === 'function' ? option() : null;
    const data = query?.data;
    const refetch = query?.refetch;
    const opt = Array.isArray(option) ? option : data || [];

    const fieldKeysOpt = useMemo(() => {
        if (!fieldKeys) return opt as fieldKeysOptItem[];
        const handle = (items: T[]) => {
            const _opts: fieldKeysOptItem[] = [];
            items.forEach((item) => {
                const children = item[fieldKeys['children']];
                const child = Array.isArray(children) && children.length > 0 ? handle(children) : undefined;
                _opts.push({
                    label: item[fieldKeys['label']] as string,
                    value: item[fieldKeys['value']] as string,
                    children: child,
                });
            });
            return _opts;
        };
        return handle(opt);
    }, [opt]);

    return (
        <Form.Item
            name={name}
            label={label}
            arrow={arrow}
            trigger="onConfirm"
            onClick={(_e, cascadePickerRef) => {
                if (refetch) refetch();
                cascadePickerRef.current?.open();
            }}
        >
            <Cascader options={fieldKeysOpt}>
                {(value) => {
                    if (Array.isArray(value) && value.length > 0) return value.map((item) => item?.label).join(' / ');
                    return <span style={{ color: 'var(--adm-color-light)' }}>{placeholder}</span>;
                }}
            </Cascader>
        </Form.Item>
    );
}

export default CustomFormItem;
