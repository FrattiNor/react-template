import { TableInstance } from '@pkg/table';

const getDefaultTableConfColumns = (table: TableInstance<any>) => {
    const { indexColumns, props } = table;
    return [...indexColumns, ...props.columns].map((item, index) => ({
        ...item,
        index,
        id: item.key,
        hidden: false,
        fixed: item.fixed ?? 'default',
    }));
};

export default getDefaultTableConfColumns;
