import { useTableDataContext, TableColumnsConfItem } from '@pkg/table';
import { TableColumnConfProps, TableConfColumn } from '../type';
import { defaultWidth } from '@pkg/table/src/useTable';

export const useResetData = ({ columns }: TableColumnConfProps) => {
    const getResetData = (): TableConfColumn[] => {
        const newColumns = [...columns].map((item, index) => ({
            ...item,
            id: item.key,
            index: index,
            hidden: false,
            fixed: item.fixed ?? 'default',
            width: item.width ?? defaultWidth,
        }));

        return newColumns;
    };

    return getResetData;
};

export const useDefaultData = ({ columns }: TableColumnConfProps) => {
    const { columnsConf } = useTableDataContext();

    const getDefaultData = (): TableConfColumn[] => {
        const newColumns = [...columns].map((item, index) => ({
            ...item,
            id: item.key,
            index: columnsConf[item.key]?.index ?? index,
            hidden: columnsConf[item.key]?.hidden ?? false,
            width: columnsConf[item.key]?.width ?? item.width ?? 150,
            fixed: columnsConf[item.key]?.fixed ?? item.fixed ?? 'default',
        }));

        return newColumns;
    };

    return getDefaultData;
};

export const useSubmitData = () => {
    const { setColumnsConf } = useTableDataContext();

    const submitData = (nextData: TableConfColumn[]) => {
        const nextColumnsConf: Record<string, TableColumnsConfItem> = {};

        let index = 0;

        nextData.forEach((item) => {
            nextColumnsConf[item.key] = {
                index,
                fixed: item.fixed,
                width: item.width,
                hidden: item.hidden,
            };

            index++;
        });

        setColumnsConf(nextColumnsConf);
    };

    return submitData;
};
