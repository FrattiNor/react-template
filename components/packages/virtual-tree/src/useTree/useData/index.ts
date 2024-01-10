import { AnyObj, HandledDataItem, VirtualTreeProps } from '../../type';
import { useState, useMemo } from 'react';

const useData = <T extends AnyObj>(props: VirtualTreeProps<T>) => {
    const { data, fieldKeys } = props;
    const [visibles, setVisibles] = useState<Record<string, boolean>>({});

    const showData = useMemo(() => {
        const handledData: HandledDataItem<T>[] = [];

        const recursionData = (v: T[], level = 0) => {
            v.forEach((item) => {
                const key = item?.[fieldKeys?.key ?? ('key' as any)];
                const label = item?.[fieldKeys?.label ?? ('label' as any)];
                const children = item?.[fieldKeys?.children ?? ('children' as any)];

                const visible = visibles[key];
                const haveChildren = Array.isArray(children) && children.length > 0;

                const handledItem: HandledDataItem<T> = {
                    key,
                    label,
                    level,
                    visible,
                    data: item,
                    isLeaf: !haveChildren,
                };

                handledData.push(handledItem);

                if (visible && haveChildren) recursionData(children, level + 1);
            });
        };

        recursionData(data);

        return handledData;
    }, [data, visibles, JSON.stringify(fieldKeys)]);

    const isEmpty = Array.isArray(data) ? data.length === 0 : true;

    return { showData, isEmpty, visibles, setVisibles };
};

export default useData;
