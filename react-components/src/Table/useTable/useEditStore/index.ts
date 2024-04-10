import { startTransition, useEffect, useState } from 'react';

import type { DataSource } from '../useDataSource';

type Opt<T> = {
    dataSource: DataSource<T>;
};

const useEditStore = <T>({ dataSource }: Opt<T>) => {
    const [editCellValues, setEditCellValues] = useState<Record<string, string>>({});

    // 数据源变更后清空编辑缓存
    useEffect(() => {
        startTransition(() => {
            setEditCellValues({});
        });
    }, [dataSource.totalDataSource]);

    return { editCellValues, setEditCellValues };
};

export default useEditStore;
