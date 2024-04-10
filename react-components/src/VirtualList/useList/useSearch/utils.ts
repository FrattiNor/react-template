import { regExpMatch } from '@react/utils';

import type { AnyObj, VirtualListFieldKeys } from '../../type';
import { defaultFieldKeys } from '../index';

type FindFirstSearchedIndexProps<T> = {
    data: T[];
    keyword?: string;
    fieldKeys?: VirtualListFieldKeys<T>;
};

export const findFirstSearchedIndex = <T extends AnyObj>({ keyword, data, fieldKeys }: FindFirstSearchedIndexProps<T>) => {
    let firstSearchedIndex: number | null = null;

    if (typeof keyword === 'string' && keyword !== '') {
        for (let i = 0; i < data.length; i++) {
            if (firstSearchedIndex !== null) break;

            const item = data[i];
            const { label: FLabel } = fieldKeys || defaultFieldKeys;
            const label = item?.[FLabel];

            // 搜索label
            if (typeof label === 'string' && keyword && regExpMatch(label, keyword).length > 0) {
                firstSearchedIndex = i;
                break;
            }
        }
    }

    return firstSearchedIndex;
};
