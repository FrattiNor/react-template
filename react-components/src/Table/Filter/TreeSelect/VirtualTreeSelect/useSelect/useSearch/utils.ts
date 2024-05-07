import { regExpMatch } from '@react/utils';

import { defaultFieldKeys } from '..';

import type { AnyObj, VirtualTreeSelectFieldKeys, HandledDataItem } from '../../type';

const getKeyLabelDisabled = <T extends AnyObj>(item: T, fieldKeys?: VirtualTreeSelectFieldKeys<T>) => {
    const { key: FKey, label: FLabel, disabled: FDisabled, children: FChildren } = fieldKeys || defaultFieldKeys;
    const key = item?.[FKey];
    const label = item?.[FLabel];
    const disabled = FDisabled ? (typeof FDisabled === 'function' ? FDisabled(item) : item?.[FDisabled]) : false;
    const children = item?.[FChildren];
    return { key, label, children, disabled };
};

export const getShowData = <T extends AnyObj>({
    data,
    visibles,
    searchedKeys,
    fieldKeys,
    keyword,
}: {
    data?: T[];
    keyword?: string;
    visibles: Record<string, true>;
    searchedKeys: Record<string, true>;
    fieldKeys?: VirtualTreeSelectFieldKeys<T>;
}) => {
    const nextShowData: HandledDataItem<T>[] = [];

    type GetNextShowDataOpt = { level: number; parentSearched: boolean };

    // 遍历获取showData
    const getNextShowData = (data: T[], { level, parentSearched }: GetNextShowDataOpt) => {
        data?.forEach((item) => {
            const { key, label, children, disabled } = getKeyLabelDisabled(item, fieldKeys);

            // 是否展开
            const visible = visibles[key] ?? false;

            // 是否被搜索【父节点被搜索到也算】【因为searchedKeys只包含被搜索到的节点以及其子节点，不判断父节点是否被搜索到，会直接没有children】
            const searched = parentSearched === true || keyword === '' || keyword === undefined || (searchedKeys[key] ?? false);

            // 如果被搜索到
            if (searched) {
                // 是否为叶子节点
                const isLeaf = !(Array.isArray(children) && children.length > 0);

                nextShowData.push({
                    key,
                    level,
                    label,
                    isLeaf,
                    visible,
                    disabled,
                    data: item,
                });

                // 如果展开，如果存在children，遍历children
                if (visible && Array.isArray(children) && children.length > 0) {
                    getNextShowData(children, { level: level + 1, parentSearched: searched });
                }
            }
        });
    };

    // 执行遍历
    if (data) getNextShowData(data, { level: 0, parentSearched: false });

    return nextShowData;
};

export const getKeywordChange = <T extends AnyObj>({
    data,
    fieldKeys,
    keyword,
}: {
    data?: T[];
    keyword?: string;
    fieldKeys?: VirtualTreeSelectFieldKeys<T>;
}) => {
    const nextVisibles: Record<string, true> = {};
    const nextSearchedKeys: Record<string, true> = {};

    if (keyword !== '' && keyword !== undefined) {
        // 遍历获取被展开的节点
        const getNextVisibles = (data: T[]): boolean => {
            // 返回给父节点，是否存在被搜索到的children
            let haveSearchedChild = false;

            data?.forEach((item) => {
                const { key, label, children } = getKeyLabelDisabled(item, fieldKeys);

                // 判断当前节点下是否有被搜索到的children
                let currentNodeHaveSearchedChild = false;

                // 如果存在children，遍历children
                if (Array.isArray(children) && children.length > 0) {
                    currentNodeHaveSearchedChild = getNextVisibles(children);
                }

                // 当前节点有被搜索到的children【设置展开】
                if (currentNodeHaveSearchedChild) {
                    nextVisibles[key] = true;
                }

                // 当前节点有被搜索到的children或者，自身被搜索到【返回给父节点为被搜索到】【给】
                if (currentNodeHaveSearchedChild || keyword === '' || keyword === undefined || regExpMatch(label, keyword).length > 0) {
                    haveSearchedChild = true;
                    nextSearchedKeys[key] = true;
                }
            });

            return haveSearchedChild;
        };

        // 执行遍历
        if (data) getNextVisibles(data);
    }

    return { nextVisibles, nextSearchedKeys };
};

export const getDefaultVisibles = <T extends AnyObj>({
    data,
    fieldKeys,
    selectedKeys,
}: {
    data?: T[];
    selectedKeys: string[];
    fieldKeys?: VirtualTreeSelectFieldKeys<T>;
}) => {
    const nextVisibles: Record<string, true> = {};

    // 遍历获取被展开的节点
    const getNextVisibles = (data: T[]): boolean => {
        // 返回给父节点，是否存在被选中的children
        let haveSelectedChild = false;

        data?.forEach((item) => {
            const { key, children } = getKeyLabelDisabled(item, fieldKeys);

            // 判断当前节点下是否有被选中的children
            let currentNodeHaveSelectedChild = false;

            // 如果存在children，遍历children
            if (Array.isArray(children) && children.length > 0) {
                currentNodeHaveSelectedChild = getNextVisibles(children);
            }

            // 当前节点有被选中的children【设置展开】
            if (currentNodeHaveSelectedChild) {
                nextVisibles[key] = true;
            }

            // 当前节点有被选中的children或者，自身被选中
            if (currentNodeHaveSelectedChild || selectedKeys.includes(key)) {
                haveSelectedChild = true;
            }
        });

        return haveSelectedChild;
    };

    // 执行遍历
    if (data) getNextVisibles(data);

    return nextVisibles;
};
