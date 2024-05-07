import { useMemo } from 'react';

import { defaultFieldKeys } from '../index';

import type { AnyObj, HandledDataItem, VirtualTreeProps } from '../../type';

type Props<T> = {
    props: VirtualTreeProps<T>;
    visibles: Record<string, boolean>;
};

const useData = <T extends AnyObj>({ props, visibles }: Props<T>) => {
    const { data, fieldKeys } = props;

    const { showData, totalData } = useMemo(() => {
        const showHandledData: HandledDataItem<T>[] = [];
        const totalHandledData: HandledDataItem<T>[] = [];

        if (data) {
            // parentOpened 需要自己的是打开状态并且自己的祖先也是打开状态
            const recursionData = (v: T[], { level, parentOpened }: { level: number; parentOpened: boolean }) => {
                v.forEach((item) => {
                    const { key: FKey, label: FLabel, children: FChildren, disabled: FDisabled } = fieldKeys || defaultFieldKeys;
                    const key = item?.[FKey];
                    const label = item?.[FLabel];
                    const children = item?.[FChildren];
                    const disabled = FDisabled ? (typeof FDisabled === 'function' ? FDisabled(item) : item?.[FDisabled]) : false;
                    const visible = visibles[key];
                    const haveChildren = Array.isArray(children) && children.length > 0;

                    const handledItem: HandledDataItem<T> = {
                        key,
                        label,
                        level,
                        visible,
                        disabled,
                        data: item,
                        isLeaf: !haveChildren,
                    };

                    totalHandledData.push(handledItem);
                    if (parentOpened) showHandledData.push(handledItem);
                    if (haveChildren) recursionData(children, { level: level + 1, parentOpened: parentOpened && visible });
                });
            };

            recursionData(data, { level: 0, parentOpened: true });
        }

        return { showData: showHandledData, totalData: totalHandledData };
    }, [data, visibles, JSON.stringify(fieldKeys)]);

    const isEmpty = Array.isArray(data) ? data.length === 0 : true;

    return { showData, totalData, isEmpty };
};

export default useData;
