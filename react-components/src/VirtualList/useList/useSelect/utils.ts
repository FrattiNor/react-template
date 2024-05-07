import { defaultFieldKeys } from '../index';

import type { AnyObj, VirtualListFieldKeys } from '../../type';

type FindSearchKeyIndex<T> = {
    data: T[];
    searchKey: string;
    fieldKeys?: VirtualListFieldKeys<T>;
};

export const findSearchKeyIndex = <T extends AnyObj>({ searchKey, data, fieldKeys }: FindSearchKeyIndex<T>) => {
    let searchKeyIndex: number | null = null;

    for (let i = 0; i < data.length; i++) {
        if (searchKeyIndex !== null) break;

        const item = data[i];
        const { key: FKey = 'key' } = fieldKeys || defaultFieldKeys;
        const key = item?.[FKey];

        if (searchKey === key) {
            searchKeyIndex = i;
            break;
        }
    }

    return searchKeyIndex as number | null;
};
