import { TableColumnConfProps, TableConfColumn } from '../type';
import { defaultWidth } from '@pkg/table/src/useTable';
import { TableColumnsConfItem } from '@pkg/table';

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

export const useSubmitData = ({ setColumnsConf }: TableColumnConfProps) => {
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
