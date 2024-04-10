import { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { isEmpty } from '@react/utils';
import { Input } from 'antd';

import styles from './index.module.less';
import VirtualSelect from './VirtualSelect';
import Template from '../_Template';

type FilterSelectProps<T> = {
    width?: number;
    search?: boolean;
    multiple?: boolean;
    afterSubmit?: () => void;
    value: string | string[];
    setValue: (nextValue: string | string[]) => void;
    option?: T[];
    fieldKeys: { value: keyof T; label: keyof T };
};

const Select = <T,>({ width = 150, value, setValue, multiple, search, afterSubmit, option, fieldKeys }: FilterSelectProps<T>) => {
    const [keyword, setKeyword] = useState<string | undefined>();
    const [innerValue, setInnerValue] = useState(() => (Array.isArray(value) ? value : isEmpty(value) ? [] : [value]));
    const haveValue = Array.isArray(innerValue) && innerValue.length > 0;

    const submit = () => {
        setValue(multiple ? innerValue : innerValue[0]);
        if (afterSubmit) afterSubmit();
    };

    const reset = () => {
        setInnerValue([]);
    };

    return (
        <Template width={width} submit={submit} reset={reset} resetDisabled={!haveValue}>
            {search && (
                <div className={styles['search']}>
                    <Input
                        allowClear
                        value={keyword}
                        style={{ width: '100%' }}
                        onChange={(e) => setKeyword(e.target.value)}
                        suffix={<SearchOutlined style={{ color: 'var(--theme-placeholder-foreground)' }} />}
                    />
                </div>
            )}
            <div className={styles['select-list']}>
                <VirtualSelect
                    data={option}
                    keyword={keyword}
                    multiple={multiple}
                    selectedKeys={innerValue}
                    setSelectedKeys={setInnerValue}
                    fieldKeys={fieldKeys ? { key: fieldKeys.value, label: fieldKeys.label } : undefined}
                />
            </div>
        </Template>
    );
};

export default Select;
