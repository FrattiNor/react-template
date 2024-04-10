import { useEffect, useState } from 'react';

import { findSearchKeyIndex } from './utils';
import type { AnyObj, VirtualListProps } from '../../type';
import type { Virtualizer } from '@react/hooks/src/useVirtualizer';

type Props<T> = {
    props: VirtualListProps<T>;
    virtualizer: Virtualizer<HTMLDivElement, Element>;
};

const useSelect = <T extends AnyObj>({ props, virtualizer }: Props<T>) => {
    const { shouldSelectedKeyChange, data, fieldKeys } = props;

    const [innerSelectedKey, setInnerSelectedKey] = useState<string | undefined>(undefined);

    const selectedKey = props.selectedKey ?? innerSelectedKey;

    const setSelectedKey = (key: string | undefined, item: T) => {
        if (!(typeof shouldSelectedKeyChange === 'function' && !shouldSelectedKeyChange(key))) {
            if (props.setSelectedKey) props.setSelectedKey(key, item);
            setInnerSelectedKey(key);
        }
    };

    // 如果选中变更，并且不是内部触发的，执行滚动
    useEffect(() => {
        if (data && selectedKey && selectedKey !== innerSelectedKey) {
            const searchKeyIndex = findSearchKeyIndex({ data, fieldKeys, searchKey: selectedKey });
            if (typeof searchKeyIndex === 'number') virtualizer.scrollToIndex(searchKeyIndex, { align: 'center' });
        }
    }, [selectedKey]);

    return { selectedKey, setSelectedKey };
};

export default useSelect;
