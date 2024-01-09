import { TableInstance } from '@pkg/table';

const getDefaultTableConfColumns = (table: TableInstance<any>) => {
    const { outerProps, innerProps } = table;
    return [...innerProps.indexColumns, ...outerProps.columns].map((item, index) => ({
        ...item,
        index,
        id: item.key,
        hidden: false,
        fixed: item.fixed ?? 'default',
    }));
};

export default getDefaultTableConfColumns;
