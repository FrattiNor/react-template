import { AnyObj, VirtualTreeProps } from '../../type';
import { useState, useMemo } from 'react';

const useSelect = <T extends AnyObj>(props: VirtualTreeProps<T>) => {
    const [_selectedKeys, _setSelectedKeys] = useState<string[]>([]);
    const selectedKeys = props.selectedKeys ?? _selectedKeys;
    const setSelectedKeys = props?.setSelectedKeys ?? _setSelectedKeys;

    const selectedKeysObj = useMemo(() => {
        const keysObj: Record<string, boolean> = {};
        selectedKeys.forEach((key) => {
            keysObj[key] = true;
        });
        return keysObj;
    }, [selectedKeys]);

    const setSelectedKeysObj = (v: Record<string, boolean>) => {
        const obj = { ...selectedKeysObj, ...v };
        const nextKeys: string[] = [];
        Object.entries(obj).forEach(([key, value]) => {
            if (value === true) nextKeys.push(key);
        });
        setSelectedKeys(nextKeys);
    };

    return { selectedKeys, setSelectedKeys, selectedKeysObj, setSelectedKeysObj };
};

export default useSelect;
