import type { FC } from 'react';
import { useState } from 'react';

import { Input } from 'antd';

import styles from './index.module.less';
import Template from '../_Template';

type FilterInputProps = {
    closeDropdown: () => void;
    value: string | undefined;
    submit: (nextValue: string | undefined) => void;
    reset: () => void;
};

const InputFC: FC<FilterInputProps> = ({ value, submit: _submit, reset: _reset, closeDropdown }) => {
    const [innerValue, setInnerValue] = useState(() => value);

    const submit = () => {
        _submit(innerValue);
        if (closeDropdown) closeDropdown();
    };

    const reset = () => {
        _reset();
        closeDropdown();
    };

    return (
        <Template submit={submit} reset={reset}>
            <div className={styles['input']}>
                <Input
                    allowClear
                    value={innerValue}
                    onPressEnter={submit}
                    style={{ width: '100%' }}
                    onChange={(e) => setInnerValue(e.target.value)}
                />
            </div>
        </Template>
    );
};

export default InputFC;
