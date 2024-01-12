import { AnyObj, VirtualTreeProps } from '../../type';
import { useState, useMemo } from 'react';

const useSelect = <T extends AnyObj>(props: VirtualTreeProps<T>) => {
    const { shouldSelectedKeysChange, multipleSelect } = props;
    const [_selectedKeys, __setSelectedKeys] = useState<string[]>([]);
    const selectedKeys = props.selectedKeys ?? _selectedKeys;
    const _setSelectedKeys = props?.setSelectedKeys ?? __setSelectedKeys;

    //
    const setSelectedKeys = (key: string[]) => {
        if (!(typeof shouldSelectedKeysChange === 'function' && !shouldSelectedKeysChange(key))) {
            if (!multipleSelect) {
                _setSelectedKeys(key.slice(0, 1));
            } else {
                _setSelectedKeys(key);
            }
        }
    };

    const selectedKeysObj = useMemo(() => {
        const keysObj: Record<string, boolean> = {};
        selectedKeys.forEach((key) => {
            keysObj[key] = true;
        });
        return keysObj;
    }, [selectedKeys]);

    const setSelectedKeysObj = (v: Record<string, boolean>) => {
        const obj = multipleSelect ? { ...selectedKeysObj, ...v } : v;
        const nextKeys: string[] = [];
        Object.entries(obj).forEach(([key, value]) => {
            if (value === true) nextKeys.push(key);
        });
        setSelectedKeys(nextKeys);
    };

    return { selectedKeys, setSelectedKeys, selectedKeysObj, setSelectedKeysObj };
};

export default useSelect;
