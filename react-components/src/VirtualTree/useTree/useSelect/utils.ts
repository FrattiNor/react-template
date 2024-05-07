import { defaultFieldKeys } from '../index';

import type { AnyObj, VirtualTreeFieldKeys } from '../../type';

type FindSearchKeyParentKeys<T> = {
    data: T[];
    searchKey: string;
    fieldKeys?: VirtualTreeFieldKeys<T>;
};

export const findSearchKeyParentKeys = <T extends AnyObj>({ searchKey, data, fieldKeys }: FindSearchKeyParentKeys<T>) => {
    // 搜索到的父Id
    let searchKeyParentKeys: null | Record<string, true> = null;

    // 遍历数据
    const recursionData = (v: T[], { parentKeys }: { parentKeys: Record<string, true> }) => {
        for (let i = 0; i < v.length; i++) {
            if (searchKeyParentKeys !== null) break;

            const item = v[i];
            const { key: FKey, children: FChildren } = fieldKeys || defaultFieldKeys;
            const key = item?.[FKey];
            if (searchKey === key) {
                searchKeyParentKeys = parentKeys;
                break;
            }
            // 继续遍历 children
            const children = item?.[FChildren];
            const haveChildren = Array.isArray(children) && children.length > 0;
            if (haveChildren) recursionData(children, { parentKeys: { ...parentKeys, [key]: true } });
        }
    };

    recursionData(data, { parentKeys: {} });

    return searchKeyParentKeys as null | Record<string, true>;
};

type FindSearchKeyIndex<T> = {
    data: T[];
    searchKey: string;
    visibles: Record<string, boolean>;
    fieldKeys?: VirtualTreeFieldKeys<T>;
};

export const findSearchKeyIndex = <T extends AnyObj>({ searchKey, data, fieldKeys, visibles }: FindSearchKeyIndex<T>) => {
    let index = 0;
    let searchKeyIndex: number | null = null;

    const recursionData = (v: T[]) => {
        for (let i = 0; i < v.length; i++) {
            if (searchKeyIndex !== null) break;

            const item = v[i];
            const { key: FKey, children: FChildren } = fieldKeys || defaultFieldKeys;
            const key = item?.[FKey];

            if (searchKey === key) {
                searchKeyIndex = index;
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

    recursionData(data);

    return searchKeyIndex as number | null;
};
