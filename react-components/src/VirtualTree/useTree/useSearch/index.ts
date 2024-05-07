import { useState, useEffect } from 'react';

import { findFirstSearchedIndex, findSearchedParentKeys } from './utils';

import type { AnyObj, VirtualTreeProps } from '../../type';
import type { Virtualizer } from '@react/hooks/src/useVirtualizer';

type Props<T> = {
    props: VirtualTreeProps<T>;
    virtualizer: Virtualizer<HTMLDivElement, Element>;
    visibles: Record<string, boolean>;
    setVisibles: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

const useSearch = <T extends AnyObj>({ props, virtualizer, visibles, setVisibles }: Props<T>) => {
    const { data, fieldKeys } = props;

    const [keyword, setKeyword] = useState<string | undefined>(undefined);

    // 展开搜索到的选项
    const search = (_keyword: string) => {
        const keyword = _keyword?.trim();

        if (data) {
            // 搜索到的父Id
            const searchedParentKeys = findSearchedParentKeys({ data, fieldKeys, keyword });
            setKeyword(keyword);
            setVisibles(searchedParentKeys);
        }
    };

    // 搜索Id改变后，执行滚动
    useEffect(() => {
        if (data && keyword) {
            // 执行滚动到第一个搜索项
            const firstSearchedIndex = findFirstSearchedIndex({ data, fieldKeys, keyword, visibles });
            virtualizer.scrollToIndex(firstSearchedIndex ?? 0, { align: 'center' });
        }
    }, [keyword]);

    return { search, keyword };
};

export default useSearch;
