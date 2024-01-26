import { AnyObj, VirtualListProps } from '../../type';
import { useMergeState } from '@react/hooks';
import { useMemo } from 'react';

const useSelect = <T extends AnyObj>(props: VirtualListProps<T>) => {
    const { shouldSelectedKeysChange, multipleSelect } = props;

    const [selectedKeys, _setSelectedKeys] = useMergeState<string[]>({
        defaultValue: [],
        state: props.selectedKeys,
        setState: props.setSelectedKeys,
    });

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
