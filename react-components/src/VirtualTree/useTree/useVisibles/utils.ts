import { defaultFieldKeys } from '../index';

import type { AnyObj, VirtualTreeFieldKeys } from '../../type';

type FindSearchedParentKeysProps<T> = {
    data: T[];
    defaultVisibleLevel: number;
    fieldKeys?: VirtualTreeFieldKeys<T>;
};

export const findLevelParentKeys = <T extends AnyObj>({ defaultVisibleLevel, data, fieldKeys }: FindSearchedParentKeysProps<T>) => {
    // 搜索到的父Id
    let searchedParentKeys: Record<string, true> = {};
    // 遍历数据
    const recursionData = (v: T[], { level }: { level: number }) => {
        v.forEach((item) => {
            const { key: FKey, children: FChildren } = fieldKeys || defaultFieldKeys;
            const key = item?.[FKey];
            // 等级小于等于默认打开的等级
            if (level < defaultVisibleLevel - 1) {
                searchedParentKeys = { ...searchedParentKeys, [key]: true };

                // 继续遍历 children
                const children = item?.[FChildren];
                const haveChildren = Array.isArray(children) && children.length > 0;
                if (haveChildren) recursionData(children, { level: level + 1 });
            }
            //
            if (level === defaultVisibleLevel - 1) {
                searchedParentKeys = { ...searchedParentKeys, [key]: true };
            }
        });
    };

    recursionData(data, { level: 0 });

    return searchedParentKeys;
};

type GetAllParentKeysProps<T> = {
    data: T[];
    fieldKeys?: VirtualTreeFieldKeys<T>;
};

export const getAllParentKeys = <T extends AnyObj>({ data, fieldKeys }: GetAllParentKeysProps<T>) => {
    // 搜索到的父Id
    const allParentKeys: Record<string, true> = {};
    // 遍历数据
    const recursionData = (v: T[]) => {
        v.forEach((item) => {
            const { key: FKey, children: FChildren } = fieldKeys || defaultFieldKeys;
            const key = item?.[FKey];

            // 继续遍历 children
            const children = item?.[FChildren];
            const haveChildren = Array.isArray(children) && children.length > 0;
            if (haveChildren) {
                allParentKeys[key] = true;
                recursionData(children);
            }
        });
    };

    recursionData(data);

    return allParentKeys;
};
