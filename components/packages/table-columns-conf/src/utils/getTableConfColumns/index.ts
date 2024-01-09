import { TableInstance } from '@pkg/table';

const getTableConfColumns = (table: TableInstance<any>) => {
    const { outerProps, innerProps } = table;
    const { columnsConf } = innerProps;
    return [...innerProps.indexColumns, ...outerProps.columns].map((item, index) => ({
        ...item,
        id: item.key,
        index: columnsConf[item.key]?.index ?? index,
        hidden: columnsConf[item.key]?.hidden ?? false,
        fixed: columnsConf[item.key]?.fixed ?? item.fixed ?? 'default',
    }));
};

export default getTableConfColumns;
