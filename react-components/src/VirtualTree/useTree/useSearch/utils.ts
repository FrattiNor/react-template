import { regExpMatch } from '@react/utils';

import type { AnyObj, VirtualTreeFieldKeys } from '../../type';
import { defaultFieldKeys } from '../index';

type FindSearchedParentKeysProps<T> = {
    data: T[];
    keyword?: string;
    fieldKeys?: VirtualTreeFieldKeys<T>;
};

export const findSearchedParentKeys = <T extends AnyObj>({ keyword, data, fieldKeys }: FindSearchedParentKeysProps<T>) => {
    // 搜索到的父Id
    let searchedParentKeys: Record<string, true> = {};
    // 遍历数据
    const recursionData = (v: T[], { parentKeys }: { parentKeys: Record<string, true> }) => {
        v.forEach((item) => {
            const { key: FKey, label: FLabel, children: FChildren } = fieldKeys || defaultFieldKeys;
            const key = item?.[FKey];
            const label = item?.[FLabel];
            // 搜索label
            if (typeof label === 'string' && keyword && regExpMatch(label, keyword).length > 0) {
                // 搜索到的父Id
                searchedParentKeys = { ...searchedParentKeys, ...parentKeys };
            }
            // 继续遍历 children
            const children = item?.[FChildren];
            const haveChildren = Array.isArray(children) && children.length > 0;
            if (haveChildren) recursionData(children, { parentKeys: { ...parentKeys, [key]: true } });
        });
    };

    if (typeof keyword === 'string' && keyword !== '') {
        recursionData(data, { parentKeys: {} });
    }

    return searchedParentKeys;
};

type FindFirstSearchedIndexProps<T> = {
    data: T[];
    keyword?: string;
    visibles: Record<string, boolean>;
    fieldKeys?: VirtualTreeFieldKeys<T>;
};

export const findFirstSearchedIndex = <T extends AnyObj>({ keyword, data, fieldKeys, visibles }: FindFirstSearchedIndexProps<T>) => {
    let index = 0;
    let firstSearchedIndex: number | null = null;

    const recursionData = (v: T[]) => {
        for (let i = 0; i < v.length; i++) {
            if (firstSearchedIndex !== null) break;

            const item = v[i];
            const { key: FKey, label: FLabel, children: FChildren } = fieldKeys || defaultFieldKeys;
            const key = item?.[FKey];
            const label = item?.[FLabel];

            // 搜索label
            if (typeof label === 'string' && keyword && regExpMatch(label, keyword).length > 0) {
                firstSearchedIndex = index;
                break;
            }

            index = index + 1;
            // 继续遍历 children
            const visible = visibles[key];
            const children = item?.[FChildren];
            const haveChildren = Array.isArray(children) && children.length > 0;
            if (visible && haveChildren) recursionData(children);
        }
    };

    if (typeof keyword === 'string' && keyword !== '') {
        recursionData(data);
    }

    return firstSearchedIndex;
};
