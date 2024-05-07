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
    closeDropdown: () => void;
    value: string | string[];
    reset: () => void;
    submit: (nextValue: string | string[]) => void;
    option?: T[];
    fieldKeys: { value: keyof T; label: keyof T };
};

const Select = <T,>(props: FilterSelectProps<T>) => {
    const { width = 150, value, submit: _submit, reset: _reset, multiple, search, closeDropdown, option, fieldKeys } = props;
    const [keyword, setKeyword] = useState<string | undefined>();
    const [innerValue, setInnerValue] = useState(() => (Array.isArray(value) ? value : isEmpty(value) ? [] : [value]));

    const submit = () => {
        _submit(multiple ? innerValue : innerValue[0]);
        if (closeDropdown) closeDropdown();
    };

    const reset = () => {
        _reset();
        closeDropdown();
    };

    return (
        <Template width={width} submit={submit} reset={reset}>
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
