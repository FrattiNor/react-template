import { AnyObj, HandledDataItem, VirtualTreeProps } from '../../type';
import { useState, useMemo } from 'react';

const useData = <T extends AnyObj>(props: VirtualTreeProps<T>) => {
    const { data, fieldKeys } = props;
    const [visibles, setVisibles] = useState<Record<string, boolean>>({});

    const { showData, totalData } = useMemo(() => {
        const showHandledData: HandledDataItem<T>[] = [];
        const totalHandledData: HandledDataItem<T>[] = [];

        // parentOpened 需要自己的是打开状态并且自己的祖先也是打开状态
        const recursionData = (v: T[], { level, parentOpened }: { level: number; parentOpened: boolean }) => {
            v.forEach((item) => {
                const { key: FKey = 'key', label: FLabel = 'label', children: FChildren = 'children', disabled: FDisabled } = fieldKeys || {};
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

        return { showData: showHandledData, totalData: totalHandledData };
    }, [data, visibles, JSON.stringify(fieldKeys)]);

    const isEmpty = Array.isArray(data) ? data.length === 0 : true;

    return { showData, totalData, isEmpty, visibles, setVisibles };
};

export default useData;
