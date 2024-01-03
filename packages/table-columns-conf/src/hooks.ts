import { useTableDataContext, TableFixed } from '@pkg/table';
import { Props, TableConfColumn, Data } from './type';

export const useDefaultData = ({ columns }: Props) => {
    const { indexConf, fixedConf, hiddenConf } = useTableDataContext();

    const getDefaultData = () => {
        const midColumns: TableConfColumn[] = [];
        const leftColumns: TableConfColumn[] = [];
        const rightColumns: TableConfColumn[] = [];

        columns.forEach((item, index) => {
            const fixed = fixedConf[item.key] ?? item.fixed ?? 'default';

            const newItem = {
                ...item,
                fixed,
                id: item.key,
                index: indexConf[item.key] ?? index,
                hidden: hiddenConf[item.key] ?? false,
            };

            if (fixed === 'left') {
                leftColumns.push(newItem);
            } else if (fixed === 'right') {
                rightColumns.push(newItem);
            } else {
                midColumns.push(newItem);
            }
        });

        return {
            leftColumns: leftColumns.sort((a, b) => a.index - b.index),
            midColumns: midColumns.sort((a, b) => a.index - b.index),
            rightColumns: rightColumns.sort((a, b) => a.index - b.index),
        };
    };

    return getDefaultData;
};

export const useSubmitData = () => {
    const { setIndexConf, setFixedConf, setHiddenConf } = useTableDataContext();

    const submitData = (nextData: Data) => {
        const nextIndexConf: Record<string, number> = {};
        const nextHiddenConf: Record<string, boolean> = {};
        const nextFixedConf: Record<string, TableFixed> = {};

        let index = 0;

        nextData.leftColumns.forEach((item) => {
            nextIndexConf[item.key] = index;
            nextFixedConf[item.key] = 'left';
            nextHiddenConf[item.key] = item.hidden;
            index++;
        });

        nextData.midColumns.forEach((item) => {
            nextIndexConf[item.key] = index;
            nextFixedConf[item.key] = 'default';
            nextHiddenConf[item.key] = item.hidden;
            index++;
        });

        nextData.rightColumns.forEach((item) => {
            nextIndexConf[item.key] = index;
            nextFixedConf[item.key] = 'right';
            nextHiddenConf[item.key] = item.hidden;
            index++;
        });

        setIndexConf(nextIndexConf);
        setFixedConf(nextFixedConf);
        setHiddenConf(nextHiddenConf);
    };

    return submitData;
};
