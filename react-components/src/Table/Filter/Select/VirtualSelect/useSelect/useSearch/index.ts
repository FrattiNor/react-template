import { useMemo } from 'react';

import { regExpMatch } from '@react/utils';

import { defaultFieldKeys } from '../index';

import type { AnyObj, HandledDataItem, VirtualSelectFieldKeys, VirtualSelectProps } from '../../type';

type Props<T> = {
    props: VirtualSelectProps<T>;
};

const getKeyLabelDisabled = <T extends AnyObj>(item: T, fieldKeys?: VirtualSelectFieldKeys<T>) => {
    const { key: FKey, label: FLabel, disabled: FDisabled } = fieldKeys || defaultFieldKeys;
    const key = item?.[FKey];
    const label = item?.[FLabel];
    const disabled = FDisabled ? (typeof FDisabled === 'function' ? FDisabled(item) : item?.[FDisabled]) : false;
    return { key, label, disabled };
};

const useSearch = <T extends AnyObj>({ props }: Props<T>) => {
    const { keyword, data, fieldKeys } = props;

    const showData = useMemo(() => {
        const nextData: HandledDataItem<T>[] = [];
        data?.forEach((item) => {
            const { key, label, disabled } = getKeyLabelDisabled(item, fieldKeys);
            if (keyword === undefined || keyword === '' || regExpMatch(label, keyword).length > 0) {
                nextData.push({ key, label, disabled, data: item });
            }
        });
        return nextData;
    }, [keyword, data]);

    return { showData };
};

export default useSearch;
