import { HandledProps } from '../useHandleProps';
import { useEffect, useState } from 'react';

type Opt<T> = {
    handledProps: HandledProps<T>;
};

const useEditStore = <T>({ handledProps }: Opt<T>) => {
    const [cellEdits, setCellEdits] = useState<Record<string, boolean>>({});
    const [editCellValues, setEditCellValues] = useState<Record<string, string>>({});

    // 数据源变更后清空编辑缓存
    useEffect(() => {
        setCellEdits({});
        setEditCellValues({});
    }, [handledProps.dataSource]);

    return { cellEdits, setCellEdits, editCellValues, setEditCellValues };
};

export default useEditStore;
