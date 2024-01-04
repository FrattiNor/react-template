import { BodyScrollObserver } from '../useBodyScrollObserver';
import { useEffect, useState } from 'react';

type Opt<T> = {
    sizedDataSource: T[];
    bodyScrollObserver: BodyScrollObserver;
};

const useEditStore = <T>({ sizedDataSource, bodyScrollObserver }: Opt<T>) => {
    const [cellEdits, setCellEdits] = useState<Record<string, boolean>>({});
    const [editCellValues, setEditCellValues] = useState<Record<string, string>>({});

    // 数据源变更后清空编辑缓存
    useEffect(() => {
        setCellEdits({});
        setEditCellValues({});
    }, [sizedDataSource]);

    // 监听滚动取消编辑状态
    useEffect(() => {
        const handler = () => {
            setCellEdits({});
        };

        bodyScrollObserver.addHandle('editStore', handler);

        return () => {
            bodyScrollObserver.removeHandle('editStore');
        };
    }, []);

    return { cellEdits, setCellEdits, editCellValues, setEditCellValues };
};

export default useEditStore;