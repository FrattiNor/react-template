import { useState } from 'react';

import { findFirstSearchedIndex } from './utils';

import type { AnyObj, VirtualListProps } from '../../type';
import type { Virtualizer } from '@react/hooks/src/useVirtualizer';

type Props<T> = {
    props: VirtualListProps<T>;
    virtualizer: Virtualizer<HTMLDivElement, Element>;
};

const useSearch = <T extends AnyObj>({ props, virtualizer }: Props<T>) => {
    const { data, fieldKeys } = props;

    const [keyword, setKeyword] = useState<string | undefined>(undefined);

    // 展开搜索到的选项
    const search = (_keyword: string) => {
        const keyword = _keyword?.trim();

        if (data) {
            // 搜索到的父Id
            const firstSearchedIndex = findFirstSearchedIndex({ data, fieldKeys, keyword });
            setKeyword(keyword);
            virtualizer.scrollToIndex(firstSearchedIndex ?? 0, { align: 'center' });
        }
    };

    return { search, keyword };
};

export default useSearch;
