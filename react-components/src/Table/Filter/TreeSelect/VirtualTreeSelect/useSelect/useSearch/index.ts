import { useLayoutEffect, useMemo, useState } from 'react';

import { useEffectOnce, useMergeState } from '@react/hooks';

import { getDefaultVisibles, getKeywordChange, getShowData } from './utils';

import type { AnyObj, VirtualTreeSelectProps } from '../../type';

type Props<T> = {
    props: VirtualTreeSelectProps<T>;
};

const useSearch = <T extends AnyObj>({ props }: Props<T>) => {
    const { keyword, data, fieldKeys } = props;

    const [visibles, setVisibles] = useState<Record<string, true>>({});
    const [searchedKeys, setSearchedKeys] = useState<Record<string, true>>({});
    const [selectedKeys, setSelectedKeys] = useMergeState<string[]>({
        defaultValue: [],
        state: props.selectedKeys,
        setState: props.setSelectedKeys,
    });

    // 默认展开选中项【只执行一次】
    useEffectOnce(() => {
        if (data) {
            const nextVisibles = getDefaultVisibles({ data, selectedKeys, fieldKeys });

            // 设置展开
            setVisibles((oldVisibles) => {
                if (Object.keys(oldVisibles).length === 0 && Object.keys(nextVisibles).length === 0) return oldVisibles;
                return nextVisibles;
            });
        }
    }, [!!data]);

    // keyword 改变 一定会触发 searchedKeys 改变【从而触发 showData 改变】
    useLayoutEffect(() => {
        const { nextVisibles, nextSearchedKeys } = getKeywordChange({ data, fieldKeys, keyword });

        // 避免第一次进来就触发重新获取showData
        if (keyword === '' || keyword === undefined) {
            setVisibles((oldVisibles) => {
                if (Object.keys(oldVisibles).length === 0 && Object.keys(nextVisibles).length === 0) return oldVisibles;
                return nextVisibles;
            });

            setSearchedKeys((oldSearchedKeys) => {
                if (Object.keys(oldSearchedKeys).length === 0 && Object.keys(nextSearchedKeys).length === 0) return oldSearchedKeys;
                return nextSearchedKeys;
            });
        } else {
            setVisibles(nextVisibles);
            setSearchedKeys(nextSearchedKeys);
        }
    }, [keyword]);

    // 获取 showData
    const showData = useMemo(() => {
        return getShowData({ data, visibles, searchedKeys, fieldKeys, keyword });
    }, [data, visibles, searchedKeys]);

    return { selectedKeys, setSelectedKeys, showData, visibles, setVisibles };
};

export default useSearch;
