import { TableColumnConfProps, TableConfColumn } from '../type';
import { useTableDataContext, TableFixed } from '@pkg/table';

export const useResetData = ({ columns }: TableColumnConfProps) => {
    const getResetData = (): TableConfColumn[] => {
        const newColumns = [...columns].map((item, index) => ({
            ...item,
            id: item.key,
            index: index,
            hidden: false,
            width: item.width ?? 150,
            fixed: item.fixed ?? 'default',
        }));

        return newColumns;
    };

    return getResetData;
};

export const useDefaultData = ({ columns }: TableColumnConfProps) => {
    const { indexConf, fixedConf, hiddenConf, widthConf } = useTableDataContext();

    const getDefaultData = (): TableConfColumn[] => {
        const newColumns = [...columns].map((item, index) => ({
            ...item,
            id: item.key,
            index: indexConf[item.key] ?? index,
            hidden: hiddenConf[item.key] ?? false,
            width: widthConf[item.key] ?? item.width ?? 150,
            fixed: fixedConf[item.key] ?? item.fixed ?? 'default',
        }));

        return newColumns;
    };

    return getDefaultData;
};

export const useSubmitData = () => {
    const { setIndexConf, setFixedConf, setHiddenConf, setWidthConf } = useTableDataContext();

    const submitData = (nextData: TableConfColumn[]) => {
        const nextWidthConf: Record<string, number> = {};
        const nextIndexConf: Record<string, number> = {};
        const nextHiddenConf: Record<string, boolean> = {};
        const nextFixedConf: Record<string, TableFixed> = {};

        let index = 0;

        nextData.forEach((item) => {
            nextIndexConf[item.key] = index;
            nextFixedConf[item.key] = item.fixed;
            nextWidthConf[item.key] = item.width;
            nextHiddenConf[item.key] = item.hidden;
            index++;
        });

        setWidthConf(nextWidthConf);
        setIndexConf(nextIndexConf);
        setFixedConf(nextFixedConf);
        setHiddenConf(nextHiddenConf);
    };

    return submitData;
};
