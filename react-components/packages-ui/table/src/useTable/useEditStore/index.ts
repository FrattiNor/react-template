import { BodyScrollObserver } from '../useBodyScrollObserver';
import { useEffect, useState } from 'react';

type Opt<T> = {
    paginationDatasource: T[];
    bodyScrollObserver: BodyScrollObserver;
};

const useEditStore = <T>({ paginationDatasource }: Opt<T>) => {
    const [editCellValues, setEditCellValues] = useState<Record<string, string>>({});

    // 数据源变更后清空编辑缓存
    useEffect(() => {
        setEditCellValues({});
    }, [paginationDatasource]);

    return { editCellValues, setEditCellValues };
};

export default useEditStore;
