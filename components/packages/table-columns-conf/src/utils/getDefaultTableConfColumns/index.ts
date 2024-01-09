import { defaultWidth } from '@pkg/table/src/useTable';
import { TableInstance } from '@pkg/table';

const getDefaultTableConfColumns = (table: TableInstance<any>) => {
    const { outerProps, innerProps } = table;
    const { horizontalItemSizeCache } = innerProps;
    return [...innerProps.indexColumns, ...outerProps.columns].map((item, index) => ({
        ...item,
        index,
        id: item.key,
        hidden: false,
        fixed: item.fixed ?? 'default',
        width: horizontalItemSizeCache.get(item.key) ?? Math.round(item.width ?? defaultWidth),
    }));
};

export default getDefaultTableConfColumns;
