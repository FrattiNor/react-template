import { RefObject, useEffect } from 'react';

type Opt<T> = {
    dataSource?: T[];
    autoScrollTop?: boolean;
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useChangeScrollTop = <T>(opt: Opt<T>) => {
    const { dataSource, autoScrollTop, bodyRef } = opt;

    // 数据变更时触发滚动回顶部
    useEffect(() => {
        if (autoScrollTop === undefined || autoScrollTop === true) {
            bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [dataSource]);
};

export default useChangeScrollTop;
