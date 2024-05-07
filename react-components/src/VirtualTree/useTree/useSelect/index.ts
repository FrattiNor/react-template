import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

import { findSearchKeyIndex, findSearchKeyParentKeys } from './utils';

import type { AnyObj, VirtualTreeProps } from '../../type';
import type { Virtualizer } from '@react/hooks/src/useVirtualizer';

type NeedScroll = {
    key: string | undefined;
    hash: string;
};

type Props<T> = {
    props: VirtualTreeProps<T>;
    visibles: Record<string, boolean>;
    virtualizer: Virtualizer<HTMLDivElement, Element>;
    setVisibles: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

const useSelect = <T extends AnyObj>({ props, virtualizer, visibles, setVisibles }: Props<T>) => {
    const { data, fieldKeys, shouldSelectedKeyChange } = props;

    const [needScroll, setNeedScroll] = useState<NeedScroll>({ key: undefined, hash: '' });

    const [innerSelectedKey, setInnerSelectedKey] = useState<string | undefined>(undefined);

    const selectedKey = props.selectedKey ?? innerSelectedKey;

    const setSelectedKey = (key: string | undefined, item: T) => {
        if (!(typeof shouldSelectedKeyChange === 'function' && !shouldSelectedKeyChange(key))) {
            if (props.setSelectedKey) props.setSelectedKey(key, item);
            setInnerSelectedKey(key);
        }
    };

    // 如果选中变更，并且不是内部触发的，执行滚动【第一步】修改展开
    useEffect(() => {
        if (data && selectedKey && selectedKey !== innerSelectedKey) {
            const searchKeyParentKeys = findSearchKeyParentKeys({ data, fieldKeys, searchKey: selectedKey });
            if (searchKeyParentKeys) {
                setVisibles((old) => ({ ...old, ...searchKeyParentKeys }));
                setNeedScroll({ key: selectedKey, hash: nanoid() });
            }
        }
    }, [selectedKey]);

    // 执行滚动【第二步】，滚动
    useEffect(() => {
        if (data && needScroll.key) {
            const searchKeyIndex = findSearchKeyIndex({ data, fieldKeys, searchKey: needScroll.key, visibles });
            if (typeof searchKeyIndex === 'number') virtualizer.scrollToIndex(searchKeyIndex, { align: 'center' });
        }
    }, [needScroll.hash]);

    return { selectedKey, setSelectedKey };
};

export default useSelect;
